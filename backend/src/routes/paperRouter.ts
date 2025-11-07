import client from "../lib/initClient.js";
import express from "express";
import { PaperType } from "../../generated/prisma/index.js";

import { Router } from "express";
import zod from 'zod';
import userMiddleware from "../middleware/user.js";

const paperRouter = Router();

import multer from "multer";

import { contactHandler, uploadProfile, userProfile } from "../controllers/user.controllers.js";
import { addPapers, getPapers } from "../controllers/paper.controllers.js";
import { getQueryById } from "../controllers/admin.controllers.js";
import { contactLimiter, uploadPaperLimiter } from "../utils/rateLimit.js";

const upload = multer({ storage: multer.memoryStorage() });
// const uploadRouter = express.Router();



paperRouter.post("/papers",getPapers);

paperRouter.post("/add-paper",userMiddleware,uploadPaperLimiter,upload.single("file"), addPapers);


paperRouter.get('/queries/:userId', getQueryById);


paperRouter.post('/contact',contactLimiter,userMiddleware,contactHandler);






 






paperRouter.put("/updateProfile",userMiddleware,upload.single("profilePic"), uploadProfile);

paperRouter.get("/profile", userMiddleware, userProfile)

export default paperRouter;


