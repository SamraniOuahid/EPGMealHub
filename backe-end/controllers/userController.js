const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Créer un compte utilisateur (admin uniquement)
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || "user",
    });
    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Connexion de l'utilisateur
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les utilisateurs (admin uniquement)
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclure les mots de passe
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };