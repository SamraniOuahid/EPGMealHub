import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Paper,
  InputAdornment,
  IconButton,
  Fade,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Visibility, VisibilityOff, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const role = decoded.role;
      const userId = decoded.id || decoded._id || decoded.userId;
      localStorage.setItem("userId", userId);

      navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      setError('Identifiants incorrects. Veuillez réessayer.');
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Container maxWidth="xs">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  mb: 2,
                  width: 56,
                  height: 56,
                  bgcolor: 'primary.main',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <RestaurantIcon sx={{ fontSize: 32 }} />
              </Avatar>

              <Typography
                component="h1"
                variant="h4"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  color: 'primary.main',
                }}
              >
                EPG MealHub
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, textAlign: 'center' }}
              >
                Connectez-vous pour accéder à votre espace
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ mt: 2, textAlign: 'center' }}
                  >
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  Se connecter
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;