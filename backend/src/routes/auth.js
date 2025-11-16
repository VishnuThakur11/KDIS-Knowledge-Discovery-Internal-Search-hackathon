import express from "express";
import { signup, signin } from "../controllers/authController.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
// router.get("/recent", async (req, res) => {
//             try {
//                 const files = await File.find()
//                     .sort({ createdAt: -1 })
//                     .limit(10);

//                 res.json({ success: true, files });
//             } catch (error) {
//                 res.status(500).json({ success: false, message: "Error fetching recent files" });
//             }
//         });
//         await newFile.save();

export default router;