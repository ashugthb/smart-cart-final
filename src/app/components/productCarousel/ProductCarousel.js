"use client";
import React from "react";
import { Box, Typography, useTheme, keyframes } from "@mui/material";

const ProductCarousel = () => {
  const theme = useTheme();

  const scrollAnimation = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  `;

  const products = [
    {
      id: 1,
      name: "Acme Hoodie",
      price: "$50.00 USD",
      image: "/images/baby-cap-black.png",
    },
    {
      id: 2,
      name: "Acme Baby Onesie",
      price: "$10.00 USD",
      image: "/images/baby-onesie-beige-1.png",
    },
    {
      id: 3,
      name: "Acme Baby Cap",
      price: "$10.00 USD",
      image: "/images/hoodie.png",
    },
    {
      id: 4,
      name: "Acme Mug",
      price: "$15.00 USD",
      image: "/images/mug.avif",
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'background.default',
        py: 4,
        my: 8,
        position: 'relative',
        '&:hover .MuiBox-root': {
          animationPlayState: 'paused',
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, md: 4 },
          animation: `${scrollAnimation} 30s linear infinite`,
          '&:hover': {
            animationPlayState: 'running',
          }
        }}
      >
        {[...products, ...products].map((product, index) => (
          <Box
            key={`${product.id}-${index}`}
            sx={{
              minWidth: { xs: 200, sm: 250, md: 300 },
              flexShhrink: 0,
              textAlign: 'center',
              color: 'text.primary',
              transition: 'all 0.3s ease',
              border: 2,
              borderColor: 'divider',
              borderRadius: 2,
              p: 2,
              mx: 1,
              '&:hover': {
                transform: 'translateY(-5px)',
                borderColor: 'primary.main',
                boxShadow: 3,
                '& img': {
                  transform: 'scale(1.05)',
                }
              }
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: { xs: 120, sm: 160, md: 200 },
                objectFit: 'contain',
                transition: 'transform 0.3s ease',
                mb: 2,
              }}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'primary.main',
                fontWeight: 500,
                mt: 1
              }}
            >
              {product.price}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductCarousel;