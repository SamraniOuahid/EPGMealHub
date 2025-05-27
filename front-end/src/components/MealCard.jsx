import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  Fade,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import OrderDialog from "./OrderDialog";

const MealCard = ({ meal }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={meal.image ? `http://localhost:5000/images/${meal.image}` : '/placeholder-meal.jpg'}
            alt={meal.name}
            sx={{
              objectFit: 'cover',
            }}
            onError={(e) => {
              e.target.src = '/placeholder-meal.jpg';
            }}
          />
          {meal.discount > 0 && (
            <Chip
              label={`-${meal.discount}%`}
              color="error"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Stack spacing={2}>
            <Typography 
              variant="h6" 
              component="h2"
              sx={{ 
                fontWeight: 700,
                color: 'text.primary',
                mb: 1
              }}
            >
              {meal.name}
            </Typography>

            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                minHeight: 60,
                lineHeight: 1.6
              }}
            >
              {meal.description}
            </Typography>

            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center"
              sx={{ mt: 'auto' }}
            >
              <Typography 
                variant="h6" 
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                {meal.price.toFixed(2)} DH
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                startIcon={<RestaurantIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none',
                  }
                }}
              >
                Commander
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <OrderDialog meal={meal} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default MealCard;