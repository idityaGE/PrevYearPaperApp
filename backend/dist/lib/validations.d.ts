import zod from 'zod';
export declare const signUpValidation: zod.ZodObject<{
    name: zod.ZodString;
    email: zod.ZodString;
    password: zod.ZodString;
}, zod.core.$strip>;
export declare const signinValidation: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, zod.core.$strip>;
//# sourceMappingURL=validations.d.ts.map