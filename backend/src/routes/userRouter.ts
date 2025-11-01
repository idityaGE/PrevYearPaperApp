import { Router } from "express";
import { signup,signin, verifyOTP, resendOTP, sendEmail } from "../controllers/auth.controllers.js";
import client from "../lib/initClient.js";
import zod from 'zod'
import userMiddleware from "../middleware/user.js";
import { authLimiter, otpResendLimiter } from "../utils/rateLimit.js";
const authRouter = Router();


authRouter.post("/signup",authLimiter, signup);

authRouter.post("/signin",authLimiter, signin);

authRouter.post('/verify-otp',otpResendLimiter, verifyOTP);

authRouter.post('/resend-otp',otpResendLimiter, resendOTP);

authRouter.post('/send-email',otpResendLimiter,sendEmail);

export default authRouter;