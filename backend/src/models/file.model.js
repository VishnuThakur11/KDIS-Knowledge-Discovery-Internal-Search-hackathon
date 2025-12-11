import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    url: String,
    fileName: String,
    fileType: String,
    user: String,
    category: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }   // IMPORTANT
);
export default mongoose.model("StoredFile", FileSchema);