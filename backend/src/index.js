import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/mongo.js";
import uploadRoutes from "./routes/upload.js";
import searchRoutes from "./routes/search.js";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import file from "./routes/file.js"

dotenv.config();
connectDB();

const app = express();

// Middleware: order matters
app.use(express.json());

// CORS middleware
const corsOptions = {
    origin:'https://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/files", file);

app.get("/",(req,res)=>{
    res.json('success');
})

// Serve uploads
app.use("/uploads", express.static("uploads"));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));