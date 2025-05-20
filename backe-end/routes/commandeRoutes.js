const express = require("express");
const router = express.Router();
const {
  createCommande,
  getAllCommandes,
  deleteCommande,
} = require("../controllers/commandeController");
const verifyToken = require("../middleware/verifyToken");

// Toutes les routes nécessitent une authentification
router.post("/", verifyToken, createCommande);
router.get("/", verifyToken, getAllCommandes);
router.delete("/:id", verifyToken, deleteCommande);

module.exports = router;
