import client from "../lib/initClient.js";
import express from "express";
import cloudinary from "../utils/cloudinary.js";
import zod from 'zod';

export const userProfile = async (req:express.Request, res:express.Response) => {
   const { id } = req.user as any;
   
   try {
    const userProfile = await client.user.findUnique({
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
   } catch (error) {
    
   }
}


const streamUpload = (fileBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profile_pictures" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

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



  export const uploadProfile = async (req: express.Request, res: express.Response) => {
  const { name, bio, linkedIn, twitter } = req.body;
  const userId = req.user.id;

  if (!userId) return res.status(400).json({ error: "User ID missing" });

  let profilePicUrl;

  try {
    // Upload profile picture if exists
    if (req.file) {
      const uploadResult: any = await streamUpload(req.file.buffer);
      profilePicUrl = uploadResult.secure_url;
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (linkedIn !== undefined) updateData.linkedIn = linkedIn;
    if (twitter !== undefined) updateData.twitter = twitter;
    if (profilePicUrl) updateData.profilePicUrl = profilePicUrl;

    const updatedUser = await client.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true, bio: true, profilePicUrl: true, linkedIn: true, twitter: true }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Profile update failed" });
  }
};


const queryValidation = zod.object({
    message: zod.string().nonempty("Message cannot be empty").max(1000,"Message too long"),
    subject:zod.string().nonempty("subject cannot be empty").max(100,"Too long subject"),
    userId: zod.number().optional()
})


export const contactHandler = async(req:express.Request,res:express.Response)=>{
const { message ,subject} = req.body;
console.log(message,subject);

const { id } = req.user as any;

//store this message in the database with the user id

const validation = queryValidation.safeParse({message,userId: id ? Number(id) : undefined,subject});
if(!validation.success){
    return res.status(400).json({ errors: validation.error.flatten().fieldErrors });
}

await client.query.create({
    data:{
        message,
        subject,
        userId: Number(id)
    }
}).then((query)=>{
    res.status(201).json({ query });
}).catch((err)=>{
    console.error("Error creating query:", err);
    res.status(500).json({ error: "Internal server error" });
});

}