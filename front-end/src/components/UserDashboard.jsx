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

  // Fonction de déconnexion
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
    <Box sx={{ pb: 8 }}>
      {/* Barre de navigation */}
      <AppBar
        position="static"
        sx={{ mb: 4, backgroundColor: theme.palette.primary.main }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RestaurantMenuIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              EPG MealHub
            </Typography>
          </Box>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ fontWeight: 500 }}
          >
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", // Ajustement pour la barre d'app
          background: `linear-gradient(to bottom right, ${alpha(
            theme.palette.primary.light,
            0.1
          )}, #f8f9fa)`,
          py: 4,
          px: { xs: 2, md: 0 },
        }}
      >
        <Container maxWidth="xl">
          {/* Hero Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: 8,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              Découvrez nos délicieux repas{" "}
              <Box
                component="span"
                sx={{ color: theme.palette.secondary.main }}
              >
                EPG MealHub
              </Box>{" "}
              🍽️
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.25rem" },
                lineHeight: 1.6,
              }}
            >
              Réservez entre <strong>9h et 18h</strong> pour bénéficier de nos{" "}
              <Box
                component="span"
                sx={{
                  bgcolor: alpha(theme.palette.warning.light, 0.3),
                  px: 1,
                  borderRadius: 1,
                }}
              >
                offres exclusives
              </Box>{" "}
              et éviter l'affluence.
            </Typography>
          </Box>

          {/* Content */}
          {error ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <Typography color="error">{error}</Typography>
            </Box>
          ) : loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <CircularProgress
                size={60}
                thickness={4}
                sx={{ color: theme.palette.primary.main }}
              />
            </Box>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {meals.map((meal) => (
                <Grid
                  item
                  key={meal._id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <MealCard
                    meal={meal}
                    sx={{
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 3,
                      },
                    }}
                  />
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