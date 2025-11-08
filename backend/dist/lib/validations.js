"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidation = exports.signUpValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpValidation = zod_1.default.object({
    name: zod_1.default.string().min(2).max(100, "Name should be between 2 and 100 characters"),
    email: zod_1.default.string().email("Invalid email format"),
    password: zod_1.default.string().min(6).max(100, 'Password should be grater than or equal to 6')
});
exports.signinValidation = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email format"),
    password: zod_1.default.string().min(6).max(100, 'Password should be grater than or equal to 6')
});
//# sourceMappingURL=validations.js.map