import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Container,
  Box,
  CircularProgress,
  useTheme,
  alpha,
  AppBar,
  Toolbar,
  Button,
  Paper,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MealCard from "./MealCard";

const UserDashboard = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/meals");
        setMeals(data);
      } catch (err) {
        setError("Erreur de chargement des repas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: 'white', 
          borderBottom: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RestaurantMenuIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" component="div" color="primary" fontWeight="bold">
              EPG MealHub
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ 
              fontWeight: 500,
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: 8 }}>
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Fade in={true} timeout={1000}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 6 }, 
                mb: 6,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                borderRadius: 4,
                textAlign: 'center'
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 800,
                  color: theme.palette.primary.dark,
                  mb: 2,
                  lineHeight: 1.2
                }}
              >
                Bienvenue sur EPG MealHub
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 4,
                  lineHeight: 1.6
                }}
              >
                Découvrez notre sélection de repas préparés avec soin. Commandez entre{' '}
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  9h et 18h
                </Box>{' '}
                pour profiter de nos meilleures offres.
              </Typography>
            </Paper>
          </Fade>

          {error ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="error" variant="h6">{error}</Typography>
            </Box>
          ) : loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {meals.map((meal) => (
                <Grid item key={meal._id} xs={12} sm={6} md={4} lg={3}>
                  <Fade in={true} timeout={800}>
                    <Box>
                      <MealCard meal={meal} />
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default UserDashboard;