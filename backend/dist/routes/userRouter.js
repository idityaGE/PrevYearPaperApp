"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_js_1 = require("../controllers/auth.controllers.js");
const rateLimit_js_1 = require("../utils/rateLimit.js");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", rateLimit_js_1.authLimiter, auth_controllers_js_1.signup);
authRouter.post("/signin", rateLimit_js_1.authLimiter, auth_controllers_js_1.signin);
authRouter.post('/verify-otp', rateLimit_js_1.otpResendLimiter, auth_controllers_js_1.verifyOTP);
authRouter.post('/resend-otp', rateLimit_js_1.otpResendLimiter, auth_controllers_js_1.resendOTP);
authRouter.post('/send-email', rateLimit_js_1.otpResendLimiter, auth_controllers_js_1.sendEmail);
exports.default = authRouter;
//# sourceMappingURL=userRouter.js.map