const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// mongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DataBase");
  })
  .catch((e) => {
    console.log(e);
  });

// PDF Schema
const pdfSchema = new mongoose.Schema({
  nameOfPerson: String,
  nameOfPDF: String,
  pdfPath: String,
});
const Pdf = mongoose.model("Pdf", pdfSchema);

// multer setup for the file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// API calls

// Create PDF Entry
app.post("/api/pdfs", upload.single("pdfFile"), async (req, res) => {
  const newPdf = new Pdf({
    nameOfPerson: req.body.nameOfPerson,
    nameOfPDF: req.body.nameOfPDF,
    pdfPath: req.file.path,
  });

  try {
    const savedPdf = await newPdf.save();
    res.status(200).send(savedPdf);
  } catch (err) {
    res.status(500).send(err);
  }
});

// fetch all pdfs

app.get("/api/pdfs", async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.status(200).send(pdfs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete pdfs
app.delete("/api/pdfs/:id", async (req, res) => {
  try {
    const deletedPdf = await Pdf.findByIdAndDelete(req.params.id);
    if (!deletedPdf) {
      return res.status(404).send({ message: "PDF not found" });
    }
    res.status(200).send(deletedPdf);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/api/pdfs/:id", upload.single("pdfFile"), async (req, res) => {
  const { nameOfPerson, nameOfPDF } = req.body;
  const { id } = req.params;
  const updateData = { nameOfPerson, nameOfPDF };

  if (req.file) {
    updateData.pdfPath = req.file.path;
  }

  try {
    const updatedPdf = await Pdf.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedPdf) {
      return res.status(404).json({ message: "PDF not found" });
    }
    res.json(updatedPdf);
  } catch (error) {
    console.error("Error updating PDF:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/pdfs/:id", async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) {
      return res.status(404).send({ message: "PDF not found" });
    }
    res.status(200).send(pdf);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server running on PORT:${process.env.PORT}`);
});
