"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  TextField,
  IconButton,
  Button
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Login,
  Logout,
  AddCircleOutline,
  Brightness4,
  Brightness7
} from "@mui/icons-material";
import { useTheme } from '../../../providers/ThemeProvider'; // Adjust path as needed

const NavBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { mode, toggleTheme } = useTheme(); // Get theme context

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    trimmedSearchTerm
      ? router.push(`/product/${trimmedSearchTerm}`)
      : alert("Please enter a valid product ID");
  };

  const handleHomeRoute = () => router.push("/");
  const handleAddProduct = () => router.push("/addProduct");

  const handleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      alert("Logged out successfully!");
    } else {
      router.push("/login");
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'primary.main',
        color: 'secondary.main',
        boxShadow: 1,
        py: 1,
        px: { xs: 2, md: 8 }
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        {/* Left Section - Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              bgcolor: 'secondary.main',
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={handleHomeRoute}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": { color: 'text.secondary' },
            }}
            onClick={handleHomeRoute}
          >
            SMART CART
          </Typography>
        </Box>

        {/* Center Section - Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button
            color="inherit"
            sx={{
              textTransform: "none",
              "&:hover": { bgcolor: 'action.hover' }
            }}
          >
            All
          </Button>
          <Button
            color="inherit"
            sx={{
              textTransform: "none",
              "&:hover": { bgcolor: 'action.hover' }
            }}
          >
            Shirts
          </Button>
          <Button
            color="inherit"
            startIcon={<AddCircleOutline />}
            onClick={handleAddProduct}
            sx={{
              textTransform: "none",
              "&:hover": { bgcolor: 'action.hover' }
            }}
          >
            Add Products
          </Button>
        </Box>

        {/* Right Section - Search and Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <form onSubmit={handleSearchSubmit}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                variant="outlined"
                placeholder="Search for products..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: 200,
                  "& .MuiOutlinedInput-root": {
                    color: 'text.primary',
                    borderRadius: "7px",
                    bgcolor: 'background.paper',
                    "& fieldset": { borderColor: 'divider' },
                    "&:hover fieldset": { borderColor: 'text.primary' }
                  }
                }}
              />
              <IconButton
                type="submit"
                sx={{
                  color: 'text.primary',
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <Search />
              </IconButton>
            </Box>
          </form>

          <IconButton sx={{ color: 'text.primary' }}>
            <ShoppingCart />
          </IconButton>

          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <Button
            variant="text"
            color="inherit"
            startIcon={isLoggedIn ? <Logout /> : <Login />}
            onClick={handleLogin}
            sx={{
              textTransform: "none",
              "&:hover": { bgcolor: 'action.hover' }
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;