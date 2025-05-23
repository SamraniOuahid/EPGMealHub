const express = require("express");
const { createUser, loginUser, getAllUsers, deleteUser, getUserById, updateUser } = require("../controllers/userController");
const { verifyToken, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

// Route pour créer un compte (admin uniquement)
router.post("/register", verifyToken, adminOnly, createUser);

// Route pour se connecter
router.post("/login", loginUser);

// Route pour obtenir tous les utilisateurs (admin uniquement)
router.get("/", verifyToken, adminOnly, getAllUsers);

// Route pour obtenir un utilisateur par ID (admin uniquement)
router.get("/:id", verifyToken, adminOnly, getUserById);

// Route pour mettre à jour un utilisateur (admin uniquement)
router.put("/:id", verifyToken, adminOnly, updateUser);

// Route pour supprimer un utilisateur (admin uniquement)
router.delete("/:id", verifyToken, adminOnly, deleteUser);


module.exports = router;
