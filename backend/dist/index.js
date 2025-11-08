"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const userRouter_js_1 = __importDefault(require("./routes/userRouter.js"));
const paperRouter_js_1 = __importDefault(require("./routes/paperRouter.js"));
const adminRoute_js_1 = __importDefault(require("./routes/adminRoute.js"));
const uploadRoute_js_1 = __importDefault(require("./routes/uploadRoute.js"));
const rateLimit_js_1 = require("./utils/rateLimit.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const allowedOrigins = [
    'https://prev-year-paper-app.vercel.app'
];
app.use((0, helmet_1.default)());
app.use((req, res, next) => {
    console.log('Incoming Origin:', req.headers.origin);
    next();
});
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // Allow server-to-server, curl, Postman
        const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed));
        if (isAllowed) {
            callback(null, true);
        }
        else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Very important for preflight handling
// Limit body size to 5 MB for JSON and URL-encoded data
app.use(express_1.default.json({ limit: '5mb' }));
app.use(express_1.default.urlencoded({ limit: '5mb', extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api", rateLimit_js_1.generalLimiter);
app.use('/api/auth', userRouter_js_1.default);
app.use('/api/user', paperRouter_js_1.default);
app.use('/api/admin', adminRoute_js_1.default);
app.use('/api', uploadRoute_js_1.default);
app.get('/check', (req, res) => {
    res.send('Check route is working');
});
const BACKEND_URL = "https://myprevyearpaperapp.onrender.com";
app.listen(port, () => {
    console.log(`Example app listening at ${BACKEND_URL}`);
});
//# sourceMappingURL=index.js.map