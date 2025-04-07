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

const allowedOrigins = [
    'http://localhost:3000',         // for local dev
    'http://logmanager-frontend:3000',          // Docker internal name
    'http://127.0.0.1:3000',         // optional
  ];

// app.use(cors({
//     origin: 'http://localhost:3000', // or process.env.FRONTEND_URL
//     credentials: true,               // ✅ needed if you're sending cookies
//   }));

app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl or postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // if using cookies
  }));

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



