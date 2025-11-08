"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_js_1 = __importDefault(require("../middleware/user.js"));
const paperRouter = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const user_controllers_js_1 = require("../controllers/user.controllers.js");
const paper_controllers_js_1 = require("../controllers/paper.controllers.js");
const admin_controllers_js_1 = require("../controllers/admin.controllers.js");
const rateLimit_js_1 = require("../utils/rateLimit.js");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// const uploadRouter = express.Router();
paperRouter.post("/papers", paper_controllers_js_1.getPapers);
paperRouter.post("/add-paper", user_js_1.default, rateLimit_js_1.uploadPaperLimiter, upload.single("file"), paper_controllers_js_1.addPapers);
paperRouter.get('/queries/:userId', admin_controllers_js_1.getQueryById);
paperRouter.post('/contact', rateLimit_js_1.contactLimiter, user_js_1.default, user_controllers_js_1.contactHandler);
paperRouter.put("/updateProfile", user_js_1.default, upload.single("profilePic"), user_controllers_js_1.uploadProfile);
paperRouter.get("/profile", user_js_1.default, user_controllers_js_1.userProfile);
exports.default = paperRouter;
//# sourceMappingURL=paperRouter.js.map