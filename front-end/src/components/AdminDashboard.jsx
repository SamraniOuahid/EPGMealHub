import {
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    AppBar,
    Typography,
    IconButton,
  } from "@mui/material";
  import RestaurantIcon from "@mui/icons-material/Restaurant";
  import PeopleIcon from "@mui/icons-material/People";
  import ReceiptIcon from "@mui/icons-material/Receipt";
  import MenuIcon from "@mui/icons-material/Menu";
  import { useState } from "react";
  
  const drawerWidth = 240;
  
  export default function AdminDashboard() {
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <div>
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Gérer Utilisateurs" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="Gérer Repas" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Commandes" />
          </ListItem>
        </List>
      </div>
    );
  
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#388e3c" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              EPG MealHub - Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f1f8e9",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#fafafa",
            minHeight: "100vh",
          }}
        >
          <Toolbar />
          <Typography variant="h4" gutterBottom>
            Bienvenue, Admin 👋
          </Typography>
          <Typography>
            Ici, vous pouvez gérer les utilisateurs, les repas et les commandes du système de réservation de repas de l’école.
          </Typography>
        </Box>
      </Box>
    );
  }
  