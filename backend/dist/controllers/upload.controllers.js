"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPaper = void 0;
const cloudinary_js_1 = __importDefault(require("../utils/cloudinary.js"));
const stream_1 = require("stream");
const uploadPaper = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // ✅ Convert file buffer to a readable stream
        const bufferStream = new stream_1.Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);
        // ✅ Upload to Cloudinary using upload_stream
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary_js_1.default.uploader.upload_stream({ resource_type: "auto", folder: "papers" }, // 👈 optional: organize files in a "papers" folder
            (error, result) => {
                if (error || !result) {
                    reject(error || new Error("Upload failed"));
                }
                else {
                    resolve(result);
                }
            });
            bufferStream.pipe(stream);
        });
        return res.status(200).json({ url: uploadResult.secure_url });
    }
    catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.uploadPaper = uploadPaper;
//# sourceMappingURL=upload.controllers.js.map