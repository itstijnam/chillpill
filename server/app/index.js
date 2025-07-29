import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../utils/db.js";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from "url";
import userRoutes from '../routes/user.route.js';
import movieRoutes from '../routes/movie.route.js';


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
const allowedOrigins = [process.env.FRONTEND_URL, "https://chillpill-sandy.vercel.app", "http://localhost:5173"];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/user', userRoutes);
app.use('/movie', movieRoutes);


export default app;