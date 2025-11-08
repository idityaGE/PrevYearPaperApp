"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const user_js_1 = __importDefault(require("../middleware/user.js"));
const upload_controllers_js_1 = require("../controllers/upload.controllers.js");
const rateLimit_js_1 = require("../utils/rateLimit.js");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const uploadRouter = express_1.default.Router();
uploadRouter.post("/upload", user_js_1.default, rateLimit_js_1.uploadPaperLimiter, upload.single("file"), upload_controllers_js_1.uploadPaper);
exports.default = uploadRouter;
//# sourceMappingURL=uploadRoute.js.map