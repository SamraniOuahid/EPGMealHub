import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Container, Box } from "@mui/material";
import MealCard from "./MealCard";

const UserDashboard = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/meals")
      .then((res) => setMeals(res.data))
      .catch((err) => console.error("Erreur lors du chargement des repas :", err));
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)" }}>
      <Container sx={{ mt: 4, pb: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Bienvenue dans EPG MealHub 🍽️
        </Typography>
        <Typography variant="body1" gutterBottom>
          Choisissez un repas et réservez-le pour une heure spécifique entre 9h et 18h.
        </Typography>

        <Grid container spacing={4} mt={3}>
          {meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal._id}>
              <MealCard meal={meal} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default UserDashboard;
