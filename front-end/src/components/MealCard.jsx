import { useState } from "react";
import {
  Card, CardMedia, CardContent, Typography, Button, Box
} from "@mui/material";
import OrderDialog from "./OrderDialog";

const MealCard = ({ meal }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: 8,
          },
          minHeight: 370,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={meal.image ? `http://localhost:5000/images/${meal.image}` : '/placeholder-meal.jpg'}
          alt={meal.name}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          onError={(e) => {
            e.target.src = '/placeholder-meal.jpg'; // Image par défaut si erreur
            console.log('Erreur de chargement image:', meal.image);
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {meal.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {meal.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, color: "primary.main", fontWeight: 500 }}>
            Prix: {meal.price.toFixed(2)} DH
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              py: 1,
              background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
              color: "#fff",
              boxShadow: 2,
              "&:hover": {
                background: "linear-gradient(90deg, #185a9d 0%, #43cea2 100%)",
              },
            }}
            onClick={() => setOpen(true)}
          >
            Commander
          </Button>
        </Box>
      </Card>
      <OrderDialog meal={meal} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default MealCard;
