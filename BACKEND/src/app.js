import express from 'express';
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)


export default app;