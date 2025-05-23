const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier envoyé" });
  }
  res.status(200).json({ filename: req.file.filename, url: `/images/${req.file.filename}` });
});

module.exports = router;