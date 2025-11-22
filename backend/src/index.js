import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongo.js";
import uploadRoutes from "./routes/upload.js";
import searchRoutes from "./routes/search.js";
import authRoutes from "./routes/auth.js";
import file from "./routes/file.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// CORS
const local = "http://localhost:5173";
const prod = "https://internal-search-app-vishnu-hajam.vercel.app";

const site = process.env.NODE_ENV === "production" ? prod : local;

app.use(cors({
  origin: site,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
//Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/files", file);

app.get("/", (req, res) => {
  res.json({ status: "backend OK" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("local server running on " + PORT));

export default app;