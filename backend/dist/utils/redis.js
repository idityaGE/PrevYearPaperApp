"use strict";
// redisClient.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = void 0;
const redis_1 = require("redis");
let redisClient = null;
const getRedisClient = async () => {
    if (!redisClient) {
        redisClient = (0, redis_1.createClient)({
            url: process.env.REDIS_URL || "redis://localhost:6379"
        });
        redisClient.on("error", (err) => console.error("Redis Client Error", err));
        await redisClient.connect();
    }
    return redisClient;
};
exports.getRedisClient = getRedisClient;
//# sourceMappingURL=redis.js.map