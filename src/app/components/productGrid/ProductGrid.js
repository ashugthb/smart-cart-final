"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Box, Typography, ButtonBase, useTheme, Button } from "@mui/material";
import LoadingSkeleton from "./LoadingSkeleton";

const ProductGrid = () => {
  const router = useRouter();
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/.netlify/functions/getProducts');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  if (loading) return <LoadingSkeleton />;

  if (error) return (
    <Box sx={{
      p: 3,
      textAlign: 'center',
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant="h6" color="error" gutterBottom>
        ⚠️ Error loading products
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
        {error}
      </Typography>
      <Button
        variant="contained"
        onClick={() => window.location.reload()}
        sx={{ mt: 1 }}
      >
        Try Again
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.default",
        minHeight: "100vh",
        [theme.breakpoints.up("md")]: {
          px: 4,
        },
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: theme.breakpoints.values.lg,
          margin: "0 auto",
        }}
      >
        {products.map((product) => (
          <Grid item xs={6} sm={4} md={3} sx={{ position: "relative", mt: 9, mx: 3 }} key={product.id}>
            <ButtonBase
              onClick={() => handleProductClick(product.id)}
              sx={{
                px: 1,
                width: "100%",
                height: "100%",
                borderRadius: theme.shape.borderRadius,
                overflow: "hidden",
                transition: "transform 0.3s ease",
                boxShadow: theme.shadows[2],
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: theme.shadows[8],
                  "& img": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 220, // Keep the image height fixed as in the previous version
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={Object.values(product.colors)[1]} // Use first color image
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />
              </Box>
            </ButtonBase>
            {/* Product Name and Price Section */}
            <Box
              sx={{
                px: 2,
                py: 0.1, // Reduce the padding on the top and bottom for less gap
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 0.6, // Reduce gap between name and price
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mt: 0.7,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  lineHeight: 1.2,
                  fontSize: { xs: '0.85rem', sm: '1rem', md: '1.1rem' },
                  mb: 0.25,  // Reduce bottom margin
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: theme.shape.borderRadius,
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                  whiteSpace: 'nowrap',
                  lineHeight: 1.2,
                }}
              >
                ${Number(product.price).toLocaleString('en-US')} USD
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
