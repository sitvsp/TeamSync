const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// MULTER STORAGE

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage,
});


// UPLOAD FILE

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  (req, res) => {
    res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
    });
  }
);

module.exports = router;