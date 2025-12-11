// src/routes/search.js
import express from "express";

const router = express.Router();

// Dummy search route
router.get("/", (req, res) => {
  const query = req.query.q || "";
  const results = ["Dashboard", "Invoices", "Analytics"].filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
  res.json({ success: true, results });
});

export default router;