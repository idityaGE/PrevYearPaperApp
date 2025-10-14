import jwt from 'jsonwebtoken';
import express from 'express';

export const generateToken = (userId: number, res: express.Response) => {
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: '7d',
    });

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    });

    return token;
};
