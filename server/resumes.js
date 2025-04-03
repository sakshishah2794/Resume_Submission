const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const Resume = require("../models/Resume");

dotenv.config();
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer for file upload (directly in the route)
const upload = multer({ storage: multer.memoryStorage() });

// Upload Resume
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "resumes" },
      async (error, cloudinaryResult) => {
        if (error) return res.status(500).json({ error: "Upload failed" });

        const resume = new Resume({ name, email, resumeUrl: cloudinaryResult.secure_url });
        await resume.save();
        res.status(201).json(resume);
      }
    ).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Resumes
router.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Resume
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    await Resume.findByIdAndDelete(id);
    res.json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
