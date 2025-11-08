"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactHandler = exports.uploadProfile = exports.userProfile = void 0;
const initClient_js_1 = __importDefault(require("../lib/initClient.js"));
const cloudinary_js_1 = __importDefault(require("../utils/cloudinary.js"));
const zod_1 = __importDefault(require("zod"));
const userProfile = async (req, res) => {
    const { id } = req.user;
    try {
        const userProfile = await initClient_js_1.default.user.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                profilePicUrl: true,
                linkedIn: true,
                twitter: true,
            },
        });
        res.json(userProfile);
    }
    catch (error) {
    }
};
exports.userProfile = userProfile;
const streamUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_js_1.default.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => {
            if (result)
                resolve(result);
            else
                reject(error);
        });
        stream.end(fileBuffer);
    });
};
// export const uploadProfile =   async (req:express.Request, res:express.Response) => {
//     const { name, bio, linkedIn, twitter } = req.body;
//     let profilePicUrl;
//     if (req.file) {
//       // Upload to cloudinary
//       const uploadResult = await cloudinary.uploader.upload_stream(
//         { folder: "profile_pictures" },
//         (error, result) => {
//           if (error) return res.status(500).json({ error: "Cloudinary upload failed" });
//           profilePicUrl = result?.secure_url;
//         }
//       );
//     }
//     const userId = req.user.id;
//     if(!userId){
//       return res.status(400).json({ error: "User ID not found in request" });
//     }
//     const updateData: Record<string, any> = {};
//     if (name !== undefined) updateData.name = name;
//     if (bio !== undefined) updateData.bio = bio;
//     if (linkedIn !== undefined) updateData.linkedIn = linkedIn;
//     if (twitter !== undefined) updateData.twitter = twitter;
//     if (profilePicUrl !== undefined) updateData.profilePicUrl = profilePicUrl;
//     await client.user.update({
//       where: { id: userId },
//       data: updateData,
//     });
//     const updatedUser = await client.user.update({
//       where: { id: req.user.id },
//       data: updateData,
//     });
//     res.json(updatedUser);
//   }
const uploadProfile = async (req, res) => {
    const { name, bio, linkedIn, twitter } = req.body;
    const userId = req.user.id;
    if (!userId)
        return res.status(400).json({ error: "User ID missing" });
    let profilePicUrl;
    try {
        // Upload profile picture if exists
        if (req.file) {
            const uploadResult = await streamUpload(req.file.buffer);
            profilePicUrl = uploadResult.secure_url;
        }
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (bio !== undefined)
            updateData.bio = bio;
        if (linkedIn !== undefined)
            updateData.linkedIn = linkedIn;
        if (twitter !== undefined)
            updateData.twitter = twitter;
        if (profilePicUrl)
            updateData.profilePicUrl = profilePicUrl;
        const updatedUser = await initClient_js_1.default.user.update({
            where: { id: userId },
            data: updateData,
            select: { id: true, name: true, email: true, bio: true, profilePicUrl: true, linkedIn: true, twitter: true }
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Profile update failed" });
    }
};
exports.uploadProfile = uploadProfile;
const queryValidation = zod_1.default.object({
    message: zod_1.default.string().nonempty("Message cannot be empty").max(1000, "Message too long"),
    subject: zod_1.default.string().nonempty("subject cannot be empty").max(100, "Too long subject"),
    userId: zod_1.default.number().optional()
});
const contactHandler = async (req, res) => {
    const { message, subject } = req.body;
    console.log(message, subject);
    const { id } = req.user;
    //store this message in the database with the user id
    const validation = queryValidation.safeParse({ message, userId: id ? Number(id) : undefined, subject });
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    }
    await initClient_js_1.default.query.create({
        data: {
            message,
            subject,
            userId: Number(id)
        }
    }).then((query) => {
        res.status(201).json({ query });
    }).catch((err) => {
        console.error("Error creating query:", err);
        res.status(500).json({ error: "Internal server error" });
    });
};
exports.contactHandler = contactHandler;
//# sourceMappingURL=user.controllers.js.map