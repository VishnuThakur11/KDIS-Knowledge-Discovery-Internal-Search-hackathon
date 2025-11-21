import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "../src/config/mongo.js";
import uploadRoutes from "../src/routes/upload.js";
import searchRoutes from "../src/routes/search.js";
import authRoutes from "../src/routes/auth.js";
import file from "../src/routes/file.js";
import { errorHandler } from "../src/middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// CORS
app.use(cors({
  origin: "https://internal-search-app-vishnu-hajam.vercel.app",
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/files", file);

app.get("/", (req, res) => {
  res.json({ status: "backend OK" });
});

app.use(errorHandler);

// ❗ NO app.listen() here
export default app;