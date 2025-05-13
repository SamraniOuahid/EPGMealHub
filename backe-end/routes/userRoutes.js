const express = require("express");
const { createUser, loginUser, getAllUsers } = require("../controllers/userController");
const { verifyToken, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

// Route pour créer un compte (admin uniquement)
router.post("/register", verifyToken, adminOnly, createUser);

// Route pour se connecter
router.post("/login", loginUser);

// Route pour obtenir tous les utilisateurs (admin uniquement)
router.get("/", verifyToken, adminOnly, getAllUsers);

module.exports = router;
