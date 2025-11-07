import client from "../lib/initClient.js";
import express from "express";
import { PaperType } from "../../generated/prisma/index.js";
import zod from 'zod';
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream";
export const getPapers = async (req, res) => {
    try {
        const { dept, program, sem, subject, examType, year } = req.body;
        const where = { isVerified: true };
        if (examType)
            where.type = examType;
        if (year)
            where.year = Number(year);
        where.subject = {};
        if (subject)
            where.subject.name = subject;
        if (sem) {
            where.subject.semester = {
                number: Number(sem)
            };
        }
        if (program) {
            where.subject.semester = where.subject.semester || {};
            where.subject.semester.program = { name: program };
        }
        if (dept) {
            where.subject.semester = where.subject.semester || {};
            where.subject.semester.program = where.subject.semester.program || {};
            where.subject.semester.program.department = { name: dept };
        }
        const papers = await client.paper.findMany({
            where,
            include: {
                subject: {
                    include: {
                        semester: {
                            include: {
                                program: { include: { department: true } },
                            },
                        },
                    },
                },
            },
        });
        return res.json(papers);
    }
    catch (error) {
        console.error("Error fetching papers:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
};
const paperValidation = zod.object({
    department: zod.string("Department is required"),
    program: zod.string("Program is required"),
    semester: zod.number().min(1, "Semester must be a positive number"),
    subject: zod.string("Subject is required"),
    type: zod.string("Type is required"),
    year: zod.number().min(1900).max(new Date().getFullYear(), "Invalid year"),
});
// export const addPapers = async (req:express.Request, res:express.Response) => {
//   try {
//     let { department, program, semester, subject, type, year } = req.body;
//     semester = Number(semester);
//     year = Number(year);
//     console.log(department,program,semester,subject,type);
//     const response = paperValidation.safeParse({ department, program, semester, subject, type, year });
//     if(!response.success){
//       return res.json({
//         message:response.error.issues
//       })
//     }
//     const dept = await client.department.findFirst({ where: { name: department } });
//     if (!dept) return res.status(404).json({ error: "Department not found" });
//     const dbProgram = await client.program.findFirst({
//       where: { name:program, departmentId: dept.id },
//     });
//     if (!dbProgram) return res.status(404).json({ error: "Program not found" });
//     const dbSemester = await client.semester.findFirst({
//       where: { number: semester, programId: program.id },
//     });
//     if (!dbSemester) return res.status(404).json({ error: "Semester not found" });
//     const dbSubject = await client.subject.findFirst({
//       where: { name: subject, semesterId: semester.id },
//     });
//     if (!dbSubject) return res.status(404).json({ error: "Subject not found" });
//     const isExistPaper = await client.paper.findFirst({
//       where: {
//         type: type,
//         year: year,
//         subjectId: subject.id, 
//       },
//     });
//     if (isExistPaper) {
//       return res.status(400).json({ error: "Paper already exists for this subject, year, and type" });
//     }
//       if (!req.file) {
//           return res.status(400).json({ error: "No file uploaded" });
//       }
//       const bufferStream = new Readable();
//       bufferStream.push(req.file.buffer);
//       bufferStream.push(null);
//       const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//               { resource_type: "auto", folder: "papers" }, 
//               (error:any, result:any) => {
//                 if (error || !result) {
//                   reject(error || new Error("Upload failed"));
//                 } else {
//                   resolve(result as { secure_url: string });
//                 }
//               }
//             );
//             bufferStream.pipe(stream);
//           });
//           const fileUrl = uploadResult.secure_url;
//     const paper = await client.paper.create({
//       data: {
//         type,
//         year,
//         fileUrl,
//         subjectId: dbSubject.id,
//         uploadedBy: req.user?.id|| null,
//         isVerified: false,
//       },
//     });
//     res.status(201).json({ message: "Paper submitted", paper });
//   } catch (error) {
//     console.error(" Error adding paper:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
export const addPapers = async (req, res) => {
    try {
        let { department, program, semester, subject, type, year } = req.body;
        semester = Number(semester);
        year = Number(year);
        console.log("Incoming paper data:", { department, program, semester, subject, type, year });
        // ✅ Validate input
        const validation = paperValidation.safeParse({ department, program, semester, subject, type, year });
        if (!validation.success) {
            return res.status(400).json({ message: validation.error.issues });
        }
        // ✅ Verify department → program → semester → subject hierarchy
        const dbDept = await client.department.findFirst({ where: { name: department } });
        if (!dbDept)
            return res.status(404).json({ error: "Department not found" });
        const dbProgram = await client.program.findFirst({
            where: { name: program, departmentId: dbDept.id },
        });
        if (!dbProgram)
            return res.status(404).json({ error: "Program not found" });
        const dbSemester = await client.semester.findFirst({
            where: { number: semester, programId: dbProgram.id },
        });
        if (!dbSemester)
            return res.status(404).json({ error: "Semester not found" });
        const dbSubject = await client.subject.findFirst({
            where: { name: subject, semesterId: dbSemester.id },
        });
        if (!dbSubject)
            return res.status(404).json({ error: "Subject not found" });
        const isExistPaper = await client.paper.findFirst({
            where: { type, year, subjectId: dbSubject.id },
        });
        if (isExistPaper) {
            return res.status(400).json({ error: "Paper already exists for this subject, year, and type" });
        }
        if (!req.file)
            return res.status(400).json({ error: "No file uploaded" });
        const mimeType = req.file.mimetype;
        let resourceType = "auto";
        if (mimeType.startsWith("image/"))
            resourceType = "image";
        else if (mimeType === "application/pdf")
            resourceType = "raw";
        else
            resourceType = "raw";
        console.log("Uploading file with resourceType:", resourceType, "MIME:", mimeType);
        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: resourceType, folder: "papers" }, (error, result) => {
                if (error || !result)
                    reject(error || new Error("Upload failed"));
                else
                    resolve(result);
            });
            bufferStream.pipe(stream);
        });
        // ✅ Create paper record
        const paper = await client.paper.create({
            data: {
                type,
                year,
                fileUrl: uploadResult.secure_url,
                subjectId: dbSubject.id,
                uploadedBy: req.user?.id || null,
                isVerified: false,
            },
        });
        console.log("Paper created successfully:", paper.id);
        res.status(201).json({ message: "Paper submitted", paper });
    }
    catch (error) {
        console.error("Error adding paper:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
//# sourceMappingURL=paper.controllers.js.map