// src/controllers/uploadController.js
export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    success: true,
    file: {
      originalname: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
    },
  });
};