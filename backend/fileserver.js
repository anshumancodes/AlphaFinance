const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const mongoose = require("mongoose");
const pdfParse = require("pdf-parse");
const XLSX = require("xlsx");
const mammoth = require("mammoth"); // For extracting text from DOCX
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

const ReportSchema = new mongoose.Schema({
  filename: String,
  analyzedData: Object,
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model("Report", ReportSchema);

// Multer File Upload Config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL;

// Function to Extract Data from Files
const extractData = async (filePath, fileType) => {
  if (fileType === "application/pdf") {
    const data = await pdfParse(fs.readFileSync(filePath));
    return data.text;
  } else if (fileType.includes("spreadsheetml") || fileType.includes("excel")) {
    const workbook = XLSX.readFile(filePath);
    return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  } else if (fileType.includes("word")) {
    const { value } = await mammoth.extractRawText({ path: filePath });
    return value;
  } else {
    return fs.readFileSync(filePath, "utf-8");
  }
};

// File Upload & Analysis Route
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const fileData = await extractData(req.file.path, req.file.mimetype);
    
    const response = await axios.post(
      "https://api.deepseek.com/v1/analyze",
      { model: DEEPSEEK_MODEL, data: fileData },
      { headers: { Authorization: `Bearer ${DEEPSEEK_API_KEY}` } }
    );

    const newReport = new Report({
      filename: req.file.originalname,
      analyzedData: response.data
    });

    await newReport.save();
    res.json({ message: "Analysis Complete", report: response.data });

    fs.unlinkSync(req.file.path); // Delete file after processing
  } catch (error) {
    console.error("DeepSeek API Error:", error.message);
    res.status(500).json({ error: "Analysis Failed" });
  }
});

// Fetch Reports
app.get("/reports", async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
