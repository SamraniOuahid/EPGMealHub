import * as React from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const foodImages = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    title: 'Healthy Salad',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Grilled Chicken',
  },
  {
    url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Pasta Bowl',
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    title: 'Healthy Salad',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Grilled Chicken',
  },
  {
    url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Pasta Bowl',
  },
];

export default function Home() {
    
    const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/login');
  };
  return (
    <Box sx={{ py: 6, px: 2, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Typography variant="h3" align="center" fontWeight={700} gutterBottom>
        Bienvenue sur EPGMealHub
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" mb={4}>
        Gérez vos repas, découvrez de nouvelles recettes et planifiez votre alimentation facilement.
      </Typography>
      <Grid container spacing={4} justifyContent="center" mb={4}>
        {foodImages.map((img) => (
          <Grid item xs={12} sm={6} md={4} key={img.title}>
            <Card sx={{ maxWidth: 345, mx: 'auto', borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={img.url}
                alt={img.title}
              />
              <CardContent>
                <Typography variant="subtitle1" align="center" fontWeight={600}>
                  {img.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 5, py: 1.5, fontWeight: 600, fontSize: '1.1rem', borderRadius: 2 }}
          onClick={handleSignUp}
        >
          S'inscrire
        </Button>
      </Box>
    </Box>
  );
}