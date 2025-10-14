import bcrypt from 'bcryptjs'
import { signinValidation, signUpValidation } from '../lib/validations.js';
import express from 'express';
import client from '../lib/initClient.js';
import { generateToken } from '../lib/util.js';

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

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
    const newUser = await client.user.create({
      data:{
        name,
        email,
        password: hashedPassword
      }
    })
    // generateToken(newUser.id,req);
    const token = generateToken(newUser.id,res);

    return res.status(201).json({ user: newUser, token }); 
}
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

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ errors: { password: ['Invalid Credentials'] } });
    }

    // now signin in actually

    const token = generateToken(user.id, res);

    return res.status(200).json({ user, token });
};