import { Router } from "express";
import { signup,signin } from "../controllers/auth.controllers.js";
import client from "../lib/initClient.js";
import zod from 'zod'
import userMiddleware from "../middleware/user.js";
const authRouter = Router();


authRouter.post("/signup", signup);

authRouter.post("/signin", signin);




export default authRouter;