require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const mealRoutes = require("./routes/mealRoutes");
const userRoutes = require("./routes/userRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const cors = require("cors");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", mealRoutes);
app.use("/api/users", userRoutes);
app.use("/api/commandes", commandeRoutes);
app.use("/api/upload", uploadRoutes);
// ➕ Servir les fichiers images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const uploadRoutes = require("./routes/upload");
// app.use("/api/upload", uploadRoutes);
app.use("/images", express.static("public/images"));
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
