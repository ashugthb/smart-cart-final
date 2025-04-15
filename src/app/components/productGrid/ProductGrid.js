"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Grid, Typography, Box, useTheme, ButtonBase } from "@mui/material";

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
            src={product.image}
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
                ...(isFeatured && {
                  textTransform: { xs: 'none', md: 'uppercase' },
                  letterSpacing: { md: '0.5px' }
                })
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
              {product.price}
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

  const products = [
    {
      id: "83 AC 94 13",
      name: "Circles T-Shirt",
      price: "$20.00 USD",
      image: "/images/t-shirt-1.png",
      featured: true,
    },
    {
      id: "05 3C E0 00",
      name: "Drawstring Bag",
      price: "$12.00 USD",
      image: "/images/bag-1-dark.png",
      featured: false,
    },
    {
      id: "05 3C E0 01",
      name: "Ceramic Mug",
      price: "$15.00 USD",
      image: "/images/mug.avif",
      featured: false,
    },
    {
      id: "E6 CF DF 00",
      name: "Premium Cup",
      price: "$15.00 USD",
      image: "/images/cup-black.png",
      featured: true,
    },
    {
      id: "GH 34 IK 56",
      name: "Cotton Hoodie",
      price: "$45.00 USD",
      image: "/images/baby-onesie-beige-1.png",
      featured: false,
    },
    {
      id: "MUG-001",
      name: "Porcelain Mug",
      price: "$15.00 USD",
      image: "/images/mug.avif",
      featured: false,
    },
    {
      id: "ONESIE-01",
      name: "Baby Onesie",
      price: "$10.00 USD",
      image: "/images/baby-onesie-beige-1.png",
      featured: false,
    },
    {
      id: "CAP-001",
      name: "Infant Cap",
      price: "$10.00 USD",
      image: "/images/hoodie.png",
      featured: false,
    },
  ];

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

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
            isFeatured={product.featured}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;