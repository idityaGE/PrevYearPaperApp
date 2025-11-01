import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs:30*60*1000,
    max:20,
    message: "Too many login attempts, try again later",
})

export const uploadPaperLimiter = rateLimit({
    windowMs:60*60*1000,
    max:20,
    message:"You can not upload greater than 20 papers in 1 hours please wait"
})

export const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
});

export const otpResendLimiter = rateLimit({
    windowMs:20*60*1000,
    max:10,
    message:"Too many attemps wait for 20 mins"
})


export const contactLimiter = rateLimit({
    windowMs:60*60*1000,
    max:30,
    message:"too many requests"
})
