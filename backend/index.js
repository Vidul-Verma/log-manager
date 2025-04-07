import dotenv from 'dotenv';
import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import logsRoutes from "./routes/logs.js";
import connectDB from "./db.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(json());
app.use(cookieParser());

connectDB()

// Rate limiting
app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 mins
      max: 100, // limit each IP
    })
  );


app.use('/auth', authRoutes);
app.use('/logs', logsRoutes);

app.listen(process.env.PORT,'0.0.0.0' , () => console.log("Backend running on http://localhost:4000"));



