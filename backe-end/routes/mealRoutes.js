const express = require("express");
const {
  getAllMeals,
  createMeal,
  deleteMeal,
  updateMeal,
  getMealById,
} = require("../controllers/mealController");
const router = express.Router();

// Route pour obtenir tous les repas
router.get("/meals", getAllMeals); // devient /api/meals
router.post("/meals", createMeal); // devient /api/meals
router.delete("/meals/:id", deleteMeal); // devient /api/meals/:id
router.put("/meals/:id", updateMeal); // devient /api/meals/:id
router.get("/meals/:id", getMealById); // devient /api/meals/:id

module.exports = router;
