import express from "express";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import StoredFile from "../models/file.model.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// ----------------------
// UPLOAD PDF
// ----------------------
router.post("/uploadPdf", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }




        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw",
            folder: "resumes",
        });

        // Upload directly from memory stream
        // const result = await cloudinary.uploader.upload_stream(
        //     { resource_type: "raw", folder: "resumes" },
        //     async (error, result) => {
        //         console.log(error || result)
        //     } // callback handles DB and response
        // );
        // stream.end(req.file.buffer);

        const { userId, category } = req.body;

        await StoredFile.create({
            url: result.secure_url,
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            user: userId || "12345",
            category: category || "General",
        });


        fs.unlinkSync(req.file.path);


        return res.json({
            success: true,
            message: "PDF uploaded successfully",
            url: result.secure_url,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Upload failed" });
    }
});

// ----------------------
// GET RECENT FILES
// ----------------------
// router.get("/recent", async (req, res) => {
//     try {
//         const files = await StoredFile.find()
//             .sort({ createdAt: -1 })
//             .limit(10);

//         res.json(files);
//     } catch (error) {
//         console.error("Error fetching recent files:", error);
//         res.status(500).json({ success: false, message: "Error fetching recent files" });
//     }
// });

router.get("/recent", isAuthenticated, async (req, res) => {
    try {
        const userId = req.id; // comes from isAuthenticated middleware

        const files = await StoredFile.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(10);

        res.json(files);
    } catch (error) {
        console.error("Error fetching recent files:", error);
        res.status(500).json({ success: false, message: "Error fetching recent files" });
    }
});

export default router;