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
paperRouter.post("/papers", async (req, res) => {
    try {
        const { dept, program, sem, subject, examType } = req.body;
        const where = {
            isVerified: true,
        };
        if (examType) {
            where.type = examType;
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
    }
    catch (error) {
        console.error("Error fetching papers:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});
// allow for only Admin
const paperValidation = zod.object({
    department: zod.string("Department is required"),
    program: zod.string("Program is required"),
    semester: zod.number().min(1, "Semester must be a positive number"),
    subject: zod.string("Subject is required"),
    type: zod.string("Type is required"),
    year: zod.number().min(1900).max(new Date().getFullYear(), "Invalid year"),
    // fileUrl:zod.string("File URL is required")
});
paperRouter.post("/add-paper", userMiddleware, upload.single("file"), async (req, res) => {
    try {
        let { department, program, semester, subject, type, year } = req.body;
        semester = Number(semester);
        year = Number(year);
        const response = paperValidation.safeParse({ department, program, semester, subject, type, year });
        if (!response.success) {
            console.log("validation fail");
            console.log(response.error.issues);
            return res.json({
                message: response.error.issues
            });
        }
        // Step 1: Find department, program, semester, subject (same as before)
        const dept = await client.department.findFirst({ where: { name: department } });
        if (!dept)
            return res.status(404).json({ error: "Department not found" });
        const dbProgram = await client.program.findFirst({
            where: { name: program, departmentId: dept.id },
        });
        if (!dbProgram)
            return res.status(404).json({ error: "Program not found" });
        const dbSemester = await client.semester.findFirst({
            where: { number: semester, programId: program.id },
        });
        if (!dbSemester)
            return res.status(404).json({ error: "Semester not found" });
        const dbSubject = await client.subject.findFirst({
            where: { name: subject, semesterId: semester.id },
        });
        if (!dbSubject)
            return res.status(404).json({ error: "Subject not found" });
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
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: "auto", folder: "papers" }, // 👈 optional: organize files in a "papers" folder
            (error, result) => {
                if (error || !result) {
                    reject(error || new Error("Upload failed"));
                }
                else {
                    resolve(result);
                }
            });
            bufferStream.pipe(stream);
        });
        const fileUrl = uploadResult.secure_url;
        const paper = await client.paper.create({
            data: {
                type,
                year,
                fileUrl,
                subjectId: dbSubject.id,
                uploadedBy: req.user?.id || null,
                isVerified: false,
            },
        });
        res.status(201).json({ message: "Paper submitted ✅", paper });
    }
    catch (error) {
        console.error(" Error adding paper:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//delete a paper
const queryValidation = zod.object({
    message: zod.string().nonempty("Message cannot be empty").max(1000, "Message too long"),
    userId: zod.number().optional()
});
paperRouter.post('/contact', userMiddleware, async (req, res) => {
    const { message } = req.body;
    const { id } = req.user;
    //store this message in the database with the user id
    const validation = queryValidation.safeParse({ message, userId: id ? Number(id) : undefined });
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    }
    await client.query.create({
        data: {
            message,
            userId: Number(id)
        }
    }).then((query) => {
        res.status(201).json({ query });
    }).catch((err) => {
        console.error("Error creating query:", err);
        res.status(500).json({ error: "Internal server error" });
    });
});
// Example: queryRoutes.js
paperRouter.get('/queries/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const queries = await client.query.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
        });
        res.json(queries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching queries' });
    }
});
const updateProfileSchema = zod.object({
    name: zod.string().min(2).max(100).optional(),
    bio: zod.string().max(500).optional(),
    profilePicUrl: zod.string().url().optional(),
    linkedIn: zod.string().url().optional(),
    twitter: zod.string().url().optional(),
});
// paperRouter.put("/updateProfile", userMiddleware, async (req, res) => {
//   const result = updateProfileSchema.safeParse(req.body);
//   if (!result.success) {
//     return res.status(400).json({ errors: result.error.flatten().fieldErrors });
//   }
//   const { name, bio, profilePicUrl, linkedIn, twitter } = result.data;
//   try {
//     const userId = req.user.id;
// const updateData: {
// name?: string;
// bio?: string;
// profilePicUrl?: string;
// linkedIn?: string;
// twitter?: string;
// } = {};
//     if (name !== undefined) updateData.name = name;
//     if (bio !== undefined) updateData.bio = bio;
//     if (linkedIn !== undefined) updateData.linkedIn = linkedIn;
//     if (twitter !== undefined) updateData.twitter = twitter;
//     // if frontend sends base64 image string
//     if (profilePicUrl && profilePicUrl.startsWith("data:image")) {
//       const uploadResult = await cloudinary.uploader.upload(profilePicUrl, {
//         folder: "profile_pictures",
//       });
//       updateData.profilePicUrl = uploadResult.secure_url;
//     }
//     const updatedUser = await client.user.update({
//       where: { id: userId },
//       data: updateData,
//     });
//     return res.json(updatedUser);
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return res.status(500).json({ error: "Failed to update profile" });
//   }
// });
paperRouter.put("/updateProfile", userMiddleware, upload.single("profilePic"), // 'profilePic' must match your frontend field name
async (req, res) => {
    const { name, bio, linkedIn, twitter } = req.body;
    let profilePicUrl;
    if (req.file) {
        // Upload to cloudinary
        const uploadResult = await cloudinary.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => {
            if (error)
                return res.status(500).json({ error: "Cloudinary upload failed" });
            profilePicUrl = result?.secure_url;
        });
    }
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({ error: "User ID not found in request" });
    }
    const updateData = {};
    if (name !== undefined)
        updateData.name = name;
    if (bio !== undefined)
        updateData.bio = bio;
    if (linkedIn !== undefined)
        updateData.linkedIn = linkedIn;
    if (twitter !== undefined)
        updateData.twitter = twitter;
    if (profilePicUrl !== undefined)
        updateData.profilePicUrl = profilePicUrl;
    await client.user.update({
        where: { id: userId },
        data: updateData,
    });
    const updatedUser = await client.user.update({
        where: { id: req.user.id },
        data: updateData,
    });
    res.json(updatedUser);
});
paperRouter.get("/profile", userMiddleware, async (req, res) => {
    const { id } = req.user;
    console.log(id);
    try {
        const userProfile = await client.user.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                profilePicUrl: true,
                linkedIn: true,
                twitter: true,
            },
        });
        console.log(userProfile);
        res.json(userProfile);
    }
    catch (error) {
    }
});
export default paperRouter;
//# sourceMappingURL=paperRouter.js.map