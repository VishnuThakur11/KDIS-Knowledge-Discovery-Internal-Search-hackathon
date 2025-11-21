import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "../src/config/mongo.js";
import uploadRoutes from "../src/routes/upload.js";
import searchRoutes from "../src/routes/search.js";
import authRoutes from "../src/routes/auth.js";
import { errorHandler } from "../src/middleware/errorHandler.js";
import file from "../src/routes/file.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// FULL CORS FIX for Vercel
const allowedOrigins = [
  "https://internal-search-app-vishnu-hajam.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
};

// 🔥 Fixes browser preflight OPTIONS requests on Vercel
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/files", file);

// Test route
app.get("/", (req, res) => {
  res.json("success");
});

// Serve uploads
app.use("/uploads", express.static("uploads"));

// Error handler
app.use(errorHandler);


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;