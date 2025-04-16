"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Badge
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Login,
  Logout,
  AddCircleOutline,
  Brightness4,
  Brightness7,
  Menu
} from "@mui/icons-material";
import { useTheme as useAppTheme } from '../../../providers/ThemeProvider';
import CartDialog from './CartDialog'; // Make sure path is correct

const NavBar = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme(); // MUI theme
  const { mode, toggleTheme } = useAppTheme(); // Custom theme
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // New state for cart dialog

  // Get cart quantity from Redux store
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    trimmedSearchTerm
      ? router.push(`/product/${trimmedSearchTerm}`)
      : alert("Please enter a valid product ID");
  };

  const handleHomeRoute = () => router.push("/");
  const handleAddProduct = () => router.push("/addProduct");
  const handleProductsRoute = () => {
    console.log("hellooooooooooooooo")
    router.push("/product-list");
  }

  const handleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      alert("Logged out successfully!");
    } else {
      router.push("/login");
    }
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleHomeRoute}>
            <Typography variant="h6">SMART CART</Typography>
          </ListItemButton>
        </ListItem>
        <Divider sx={{ my: 2 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={handleHomeRoute}>
            <Typography>Home</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleProductsRoute}>
            <Typography>MY List </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography>Shirts</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleAddProduct}>
            <Typography>Add Products</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: 'primary.main',
          color: 'secondary.main',
          boxShadow: 1,
          py: 1,
          px: { xs: 1, md: 8 }
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <Menu />
          </IconButton>

          {/* Logo Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              flexGrow: { xs: 1, md: 0 }
            }}
          >
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
              noWrap
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                display: { xs: 'none', sm: 'block' }
              }}
              onClick={handleHomeRoute}
            >
              SMART CART
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 3,
            flexGrow: 1,
            justifyContent: 'center'
          }}>
            <Button
              color="inherit"
              onClick={handleProductsRoute}
              sx={{
                textTransform: "none",
                "&:hover": { bgcolor: 'action.hover' }
              }}
            >
              My List
            </Button>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                "&:hover": { bgcolor: 'action.hover' }
              }}
            >
              Categories
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

          {/* Right Section */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexGrow: 0
          }}>
            {/* Mobile Search */}
            {showMobileSearch ? (
              <form onSubmit={handleSearchSubmit} style={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: 'text.primary',
                      borderRadius: "7px",
                      bgcolor: 'background.paper',
                      "& fieldset": { borderColor: 'divider' },
                      "&:hover fieldset": { borderColor: 'text.primary' }
                    }
                  }}
                />
              </form>
            ) : (
              <IconButton
                onClick={() => setShowMobileSearch(true)}
                sx={{
                  color: 'text.primary',
                  display: { md: 'none' }
                }}
              >
                <Search />
              </IconButton>
            )}

            {/* Desktop Search */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <form onSubmit={handleSearchSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    variant="outlined"
                    placeholder="Search..."
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
            </Box>

            {/* Cart Icon with Badge */}
            <IconButton
              sx={{ color: 'text.primary', display: { xs: 'none', md: 'flex' } }}
              onClick={() => setCartOpen(true)}
            >
              <Badge
                badgeContent={cartQuantity}
                color="error"
                overlap="circular"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -3,
                    top: 13,
                    border: `2px solid ${theme.palette.background.paper}`,
                    padding: '0 4px'
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

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
                display: { xs: 'none', md: 'flex' },
                "&:hover": { bgcolor: 'action.hover' }
              }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Button>

            {/* Mobile Login Icon */}
            <IconButton
              onClick={handleLogin}
              sx={{
                color: 'text.primary',
                display: { md: 'none' }
              }}
            >
              {isLoggedIn ? <Logout /> : <Login />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Cart Dialog */}
      <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 250,
            bgcolor: 'background.paper',
            color: 'text.primary'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavBar;