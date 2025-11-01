import express from 'express';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import cors from 'cors';
// import userMiddleware from './middleware/user.js';
import authRouter from './routes/userRouter.js';
import paperRouter from './routes/paperRouter.js';
import adminRouter from './routes/adminRoute.js';
import uploadRouter from './routes/uploadRoute.js';
dotenv.config();


const app = express()
const port = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));
app.use(cors({
  origin: '*',
}));


console.log(process.env.DATABASE_URL);
console.log(process.env.CLOUDINARY_CLOUD_NAME);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user',paperRouter);
app.use('/api/admin',adminRouter);
app.use('/api',uploadRouter);
app.get('/check', (req, res) => {
  res.send('Check route is working');
});
app.listen(port, () => {
  
  console.log(`Example app listening at http://localhost:${port}`)
  
})
  







