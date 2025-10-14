import { Router } from "express";
import client from "../lib/initClient.js";
import express from "express";
import { PaperType } from "../../generated/prisma/index.js";
import zod from 'zod';
import userMiddleware from "../middleware/user.js";
const paperRouter = Router();

import multer from "multer";
import cloudinary from "../utils/cloudinary.js"; 
import { Readable } from "stream";

const upload = multer({ storage: multer.memoryStorage() });
const uploadRouter = express.Router();

paperRouter.post("/papers", async (req: express.Request, res: express.Response) => {
  try {
    const { dept, program, sem, subject, examType } = req.body;

    const where: any = {
      isVerified: true, 
     };

    if (examType) {
      where.type = examType as PaperType;
    }

    if (subject || sem || program || dept) {
      where.subject = {};

      if (subject) {
        where.subject.name = subject;
      }

      if (sem || program || dept) {
        where.subject.semester = {};

        if (sem) {
          where.subject.semester.number = Number(sem);
        }

        if (program || dept) {
          where.subject.semester.program = {};

          if (program) {
            where.subject.semester.program.name = program;
          }

          if (dept) {
            where.subject.semester.program.department = {
              name: dept
            };
          }
        }
      }
    }

    const papers = await client.paper.findMany({
      where,
      include: {
        subject: {
          include: {
            semester: {
              include: {
                program: {
                  include: {
                    department: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return res.json(papers);
  } catch (error) {
    console.error("Error fetching papers:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});








// allow for only Admin
const paperValidation = zod.object({
  department:zod.string("Department is required"),
  program:zod.string("Program is required"),
  semester:zod.number().min(1, "Semester must be a positive number"),
  subject:zod.string("Subject is required"),
  type:zod.string("Type is required"),
  year:zod.number().min(1900).max(new Date().getFullYear(), "Invalid year"),
  // fileUrl:zod.string("File URL is required")
})

paperRouter.post("/add-paper",userMiddleware, upload.single("file"), async (req, res) => {
  try {
     let { department, program, semester, subject, type, year } = req.body;
    semester = Number(semester);
    year = Number(year);
    const response = paperValidation.safeParse({ department, program, semester, subject, type, year });
    if(!response.success){
      console.log("validation fail");
      console.log(response.error.issues);
      
      return res.json({
        message:response.error.issues
      })
    }
    // Step 1: Find department, program, semester, subject (same as before)
    const dept = await client.department.findFirst({ where: { name: department } });
    if (!dept) return res.status(404).json({ error: "Department not found" });

    const dbProgram = await client.program.findFirst({
      where: { name:program, departmentId: dept.id },
    });
    if (!dbProgram) return res.status(404).json({ error: "Program not found" });

    const dbSemester = await client.semester.findFirst({
      where: { number: semester, programId: program.id },
    });
    if (!dbSemester) return res.status(404).json({ error: "Semester not found" });

    const dbSubject = await client.subject.findFirst({
      where: { name: subject, semesterId: semester.id },
    });
    if (!dbSubject) return res.status(404).json({ error: "Subject not found" });

    //if there is a paper which is already present then not save it show error for user paper already exist
    const isExistPaper = await client.paper.findFirst({
      where: {
        type: type,
        year: year,
        subjectId: subject.id, 
      },
    });


    if (isExistPaper) {
      return res.status(400).json({ error: "Paper already exists for this subject, year, and type" });
    }

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const bufferStream = new Readable();
      bufferStream.push(req.file.buffer);
      bufferStream.push(null);

        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { resource_type: "auto", folder: "papers" }, // 👈 optional: organize files in a "papers" folder
                (error:any, result:any) => {
                  if (error || !result) {
                    reject(error || new Error("Upload failed"));
                  } else {
                    resolve(result as { secure_url: string });
                  }
                }
              );
      
              bufferStream.pipe(stream);
            });
      
            const fileUrl = uploadResult.secure_url;

  
    const paper = await client.paper.create({
      data: {
        type,
        year,
        fileUrl,
        subjectId: dbSubject.id,
        uploadedBy: req.user?.id|| null,
        isVerified: false,
      },
    });

    res.status(201).json({ message: "Paper submitted ✅", paper });

  } catch (error) {
    console.error(" Error adding paper:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//delete a paper



export default paperRouter;


