import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./db/ConnectToMongo.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import eventRouter from "./routes/eventRouter.js";
import volunteerRoutes from "./routes/volunteerRouter.js";
import AppError from "./utils/appError.js";
import { globalErrorHandler } from "./controllers/errorController.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: ["https://cause-connect-flax.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static(uploadDir));

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/events/:id/volunteer", volunteerRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
