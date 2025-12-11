// src/models/File.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
  fileName: String,
    url: String,
    size: Number,
    type: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    extractedText: String,
    category: String,
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);