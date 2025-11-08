"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.resendOTP = exports.verifyOTP = exports.sendEmail = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validations_js_1 = require("../lib/validations.js");
const initClient_js_1 = __importDefault(require("../lib/initClient.js"));
const util_js_1 = require("../lib/util.js");
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const zod_1 = require("zod");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
async function sendOTP(email, otp) {
    await transporter.sendMail({
        from: 'pradeepkumar434680@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`
    });
}
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const validation = validations_js_1.signUpValidation.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    }
    //check if user already exists
    const user = await initClient_js_1.default.user.findUnique({
        where: {
            email
        }
    });
    if (user) {
        res.status(400).json({ errors: 'User already exists with this Email' });
        return;
    }
    //create a new user 
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const newUser = await initClient_js_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            verficationToken: otp,
            verficationTokenExpiresAt: otpExpiry
        }
    });
    //  token = generateToken(newUser.id,res);
    await sendOTP(email, otp);
    res.status(201).json({ message: 'User registered. Please verify OTP sent to email.', user: newUser });
};
exports.signup = signup;
const sendEmail = async (req, res) => {
    //fetch otp from the db req
    const { email } = req.body;
    try {
        if (!email || email == "") {
            return res.status(404).json({ message: "Email is blank" });
        }
        const user = await initClient_js_1.default.user.findUnique({
            where: {
                email
            }
        });
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        if (user.isVerified)
            return res.status(400).json({ message: 'User already verified' });
        const otp = generateOTP();
        await initClient_js_1.default.user.update({
            where: {
                id: user.id
            },
            data: {
                verficationToken: otp,
                verficationTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000)
            }
        });
        await sendOTP(email, otp);
        return res.status(201).json({
            message: "OTP sent successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.sendEmail = sendEmail;
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'pradeepkumar434680@gmail.com',
        pass: 'friuzwkebgvpkmbu'
    }
});
const generateOTP = () => crypto_1.default.randomInt(100000, 999999).toString();
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || email == "") {
            return res.status(404).json({ message: "Email is blank" });
        }
        const user = await initClient_js_1.default.user.findUnique({
            where: { email }
        });
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        if (user.isVerified)
            return res.status(400).json({ message: 'User already verified' });
        if (!user.verficationToken || user.verficationToken !== otp) {
            return res.status(400).json({ message: 'Invalid OTP', user: user });
        }
        if (!user.verficationTokenExpiresAt || user.verficationTokenExpiresAt < new Date()) {
            return res.status(400).json({ message: 'OTP expired' });
        }
        await initClient_js_1.default.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verficationToken: null,
                verficationTokenExpiresAt: null
            }
        });
        const token = (0, util_js_1.generateToken)(user.id, res);
        res.json({ message: 'Email verified successfully. You can now log in.', success: "Success", token: token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};
exports.verifyOTP = verifyOTP;
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await initClient_js_1.default.user.findUnique({
            where: { email }
        });
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        if (user.isVerified)
            return res.status(400).json({ message: 'User already verified' });
        const otp = generateOTP();
        await initClient_js_1.default.user.update({
            where: {
                id: user.id
            },
            data: {
                verficationToken: otp,
                verficationTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000)
            }
        });
        await sendOTP(email, otp);
        res.json({ message: 'OTP resent successfully.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error resending OTP', error });
    }
};
exports.resendOTP = resendOTP;
const signin = async (req, res) => {
    const { email, password } = req.body;
    const validation = validations_js_1.signinValidation.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ errors: "Incorrect Inputs" });
    }
    const user = await initClient_js_1.default.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return res.status(400).json({ errorMessage: 'User not found' });
    }
    if (!user.isVerified) {
        return res.status(400).json({ errorMessage: 'Email not verified. Please verify OTP.' });
    }
    const isPasswordValid = bcryptjs_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ errorMessage: 'Invalid Credentials' });
    }
    // now signin in actually
    const token = (0, util_js_1.generateToken)(user.id, res);
    return res.status(200).json({ user, token, success: zod_1.success });
};
exports.signin = signin;
//# sourceMappingURL=auth.controllers.js.map