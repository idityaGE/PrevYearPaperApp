import zod from 'zod';

export const signUpValidation = zod.object({

  name: zod.string().min(2).max(100,"Name should be between 2 and 100 characters"),
  email: zod.string().email("Invalid email format"),
  password: zod.string().min(6).max(100, 'Password should be grater than or equal to 6')
});

export const signinValidation = zod.object({
  email: zod.string().email("Invalid email format"),
  password: zod.string().min(6).max(100, 'Password should be grater than or equal to 6')
});