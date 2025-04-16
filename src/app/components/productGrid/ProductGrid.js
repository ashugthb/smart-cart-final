"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Typography, Box, useTheme, ButtonBase, Button } from "@mui/material";
import LoadingSkeleton from "./LoadingSkeleton";

const ProductCard = ({ product, isFeatured = false, onClick }) => {
  const theme = useTheme();

  return (
    <Grid item xs={6} sm={4} md={isFeatured ? 8 : 4} sx={{ position: "relative" }}>
      <ButtonBase
        onClick={onClick}
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(0.98)",
            "& img": {
              transform: "scale(1.1)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: isFeatured ? { xs: 200, sm: 300, md: 500 } : 180,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={Object.values(product.colors)[0]} // Use first color image
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: theme.spacing(1),
              left: theme.spacing(1),
              right: theme.spacing(1),
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: { xs: 'none', sm: 'blur(4px)' },
              px: 1,
              py: 1,
              borderRadius: theme.shape.borderRadius,
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between",
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 0.5,
              boxShadow: theme.shadows[1],
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: theme.palette.common.white,
                lineHeight: 1.2,
                fontSize: {
                  xs: '0.75rem',
                  sm: '0.875rem',
                  md: isFeatured ? '1rem' : '0.875rem'
                },
                flex: 1,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                px: 1,
                py: 0.25,
                borderRadius: theme.shape.borderRadius,
                fontWeight: 600,
                fontSize: {
                  xs: '0.65rem',
                  sm: '0.75rem',
                  md: '0.875rem'
                },
                whiteSpace: 'nowrap',
                lineHeight: 1.2,
                boxShadow: theme.shadows[1],
              }}
            >
              ${Number(product.price).toLocaleString('en-US')} USD
            </Typography>
          </Box>
        </Box>
      </ButtonBase>
    </Grid>
  );
};

const ProductGrid = () => {
  const router = useRouter();
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
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
          <ProductCard
            key={product.id}
            product={product}
            isFeatured={product.category === 'electronics'} // Example featured logic
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;