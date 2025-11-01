import jwt from 'jsonwebtoken';
import express from 'express';
import client from '../lib/initClient.js';
export default async function userMiddleware(req, res, next) {
    try {
        const token = req.cookies.token ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No token provided' });
        }
        const decodedRes = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedRes || typeof decodedRes !== 'object' || !("userId" in decodedRes)) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        const user = await client.user.findFirst({
            where: { id: decodedRes.userId },
            select: { id: true, email: true, name: true }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.error("Middleware error:", err);
        return res.status(401).json({ error: "Unauthorized - Token error" });
    }
}
//# sourceMappingURL=user.js.map