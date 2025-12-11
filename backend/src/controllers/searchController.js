// src/controllers/searchController.js
import File from "../models/File.js";

export const searchFiles = async (req, res) => {
  try {
    const query = req.query.q || "";
    const files = await File.find({
      name: { $regex: query, $options: "i" },
    }).limit(20);
    res.json({ success: true, files });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};