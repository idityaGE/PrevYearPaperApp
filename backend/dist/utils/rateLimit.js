"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactLimiter = exports.otpResendLimiter = exports.generalLimiter = exports.uploadPaperLimiter = exports.authLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 30 * 60 * 1000,
    max: 20,
    message: "Too many login attempts, try again later",
});
exports.uploadPaperLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: "You can not upload greater than 20 papers in 1 hours please wait"
});
exports.generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 60,
});
exports.otpResendLimiter = (0, express_rate_limit_1.default)({
    windowMs: 20 * 60 * 1000,
    max: 10,
    message: "Too many attemps wait for 20 mins"
});
exports.contactLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 30,
    message: "too many requests"
});
//# sourceMappingURL=rateLimit.js.map