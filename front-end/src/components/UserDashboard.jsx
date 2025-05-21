import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  CircularProgress,
  Box,
} from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/meals');
      setMeals(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur de récupération des repas', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        🍽️ Liste des Repas
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={`http://localhost:5000/uploads/${meal.image}`} // ← image dynamique
                  alt={meal.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {meal.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {meal.description}
                  </Typography>
                  <Box mt={1}>
                    <Typography variant="subtitle2" color="text.primary">
                      Prix : <strong>{meal.price} MAD</strong>
                    </Typography>
                    {meal.discount > 0 && (
                      <Typography variant="caption" color="green">
                        Remise : {meal.discount} MAD
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
