import { Router } from "express";
import { signup,signin, verifyOTP, resendOTP } from "../controllers/auth.controllers.js";
import client from "../lib/initClient.js";
import zod from 'zod'
import userMiddleware from "../middleware/user.js";
const authRouter = Router();


authRouter.post("/signup", signup);

authRouter.post("/signin", signin);

authRouter.post('/verify-otp', verifyOTP);

authRouter.post('/resend-otp', resendOTP);
authRouter.post('/send-mail',send)

export default authRouter;