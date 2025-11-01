import bcrypt from 'bcryptjs'
import { signinValidation, signUpValidation } from '../lib/validations.js';
import express from 'express';
import client from '../lib/initClient.js';
import { generateToken } from '../lib/util.js';
import nodemailer from 'nodemailer';
import crypto  from 'crypto';
import { success } from 'zod';




const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
let token:string="";

async function sendOTP (email:string,otp :string){
      await transporter.sendMail({
      from: 'pradeepkumar434680@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`
    });
}
export const signup = async (req: express.Request, res: express.Response)=>{

  const { name, email, password } = req.body;
    const validation = signUpValidation.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    }

    //check if user already exists
    const user = await client.user.findUnique({
      where: {
        email
      }
    })

    
    if(user){
      res.status(400).json({ errors: { email: ['User already exists'] } });
      return;
    }


    //create a new user 
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = await client.user.create({
      data:{
        name,
        email,
        password: hashedPassword,
        verficationToken: otp,
        verficationTokenExpiresAt: otpExpiry
      }
    })

     token = generateToken(newUser.id,res);



     res.status(201).json({ message: 'User registered. Please verify OTP sent to email.' ,user:newUser,token:token});
}

    export const sendEmail = async(req:express.Request,res:express.Response)=>{
      //fetch otp from the db req
      const { email } = req.body;
      if(!email || email == ""){
          return res.status(404).json({message:"Email is blank"})
        }
        const user = await client.user.findUnique({
          where: {
            email
          }
        })


        if (!user) return res.status(400).json({ message: 'User not found' });

        if (user.isVerified) return res.status(400).json({ message: 'User already verified' });


        await sendOTP(email,user.verficationToken!);
        

        return res.status(201).json({
          message:"otp is sended successfully"
        })
      
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pradeepkumar434680@gmail.com',
            pass: 'friuzwkebgvpkmbu'
        }
    });


const generateOTP = () => crypto.randomInt(100000, 999999).toString();




export const verifyOTP = async (req:express.Request, res:express.Response) => {
    try {
        const { email, otp } = req.body;
        if(!email || email == ""){
          return res.status(404).json({message:"Email is blank"})
        }

        const user = await client.user.findUnique({
            where: { email }
        });

       
        

      if (!user) return res.status(400).json({ message: 'User not found' });

      if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

      if (!user.verficationToken || user.verficationToken !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' ,user:user});
      }

      if (!user.verficationTokenExpiresAt || user.verficationTokenExpiresAt < new Date()) {
        return res.status(400).json({ message: 'OTP expired' });
      }


        await client.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verficationToken: null,
                verficationTokenExpiresAt: null
            }
        });

        res.json({ message: 'Email verified successfully. You can now log in.' ,success:"Success",token:token});
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};


export const resendOTP = async (req:express.Request, res:express.Response) => {
    try {
        const { email } = req.body;
        const user = await client.user.findUnique({
          where:{email}
        });

        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

        const otp = generateOTP();

        await client.user.update({
          where:{
            id:user.id
          },
          data:{
            verficationToken:otp,
            verficationTokenExpiresAt:new Date(Date.now() + 10 * 60 * 1000)
          }
        })
 
        await sendEmail(email,otp);


        res.json({ message: 'OTP resent successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error resending OTP', error });
    }
};








export const signin = async(req:express.Request,res:express.Response)=>{
    const { email , password } = req.body;
    const validation = signinValidation.safeParse(req.body);  

    if(!validation.success){
        return res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    }

    const user = await client.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(400).json({ errors: { email: ['User not found'] } });
    }

    if (!user.isVerified) {
      return res.status(400).json({ notVerified: 'Email not verified. Please verify OTP.' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ errors: { password: ['Invalid Credentials'] } });
    }

    // now signin in actually

    const token = generateToken(user.id, res);

    return res.status(200).json({ user, token });
};