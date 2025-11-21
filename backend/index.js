import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "../src/config/mongo.js";
import uploadRoutes from "../src/routes/upload.js";
import searchRoutes from "../src/routes/search.js";
import authRoutes from "../src/routes/auth.js";
import { errorHandler } from "../src/middleware/errorHandler.js";
import file from "../src/routes/file.js"

dotenv.config();
connectDB();

const app = express();

// Middleware: order matters
app.use(express.json());

// CORS middleware
const corsOptions = {
    origin:'https://internal-search-app-vishnu-hajam.vercel.app',
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

export default app;

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));