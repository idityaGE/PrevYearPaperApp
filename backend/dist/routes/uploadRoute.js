import express from "express";
import multer from "multer";
import userMiddleware from "../middleware/user.js";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream";
import { uploadPaper } from "../controllers/upload.controllers.js";
import { uploadPaperLimiter } from "../utils/rateLimit.js";
const upload = multer({ storage: multer.memoryStorage() });
const uploadRouter = express.Router();
uploadRouter.post("/upload", userMiddleware, uploadPaperLimiter, upload.single("file"), uploadPaper);
export default uploadRouter;
//# sourceMappingURL=uploadRoute.js.map