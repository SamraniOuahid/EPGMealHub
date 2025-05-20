require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const mealRoutes = require("./routes/mealRoutes");
const userRoutes = require("./routes/userRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const app = express();


// Connexion à MongoDB
connectDB();








// Middleware
app.use(express.json());

// Routes
app.use("/api", mealRoutes);
app.use("/api/users", userRoutes);
app.use("/api/commandes", commandeRoutes);


// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
