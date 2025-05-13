"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Grid,
  Container,
  Box,
  Typography,
  Button,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import QRCode from "react-qr-code";
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import NavBar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

const ProductPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const params = useParams();
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!params?.id) return;
        console.log(params?.id, "parameter id")

        const response = await fetch(`/.netlify/functions/getProducts?id=${params.id}`);
        if (!response.ok) throw new Error('Product not found');

        const data = await response.json();
        console.log(data, "response data")
        setProduct(data);
        setSelectedColor(Object.keys(data.colors)[1]); // Set first color as default
        setSelectedSize(data.sizes[0]); // Set first size as default
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);


  // useEffect(() => {
  //   if (!params.id) return;

  //   console.log("🕵️‍♂️ fetching product for id:", params.id);
  //   const url = `/.netlify/functions/getProducts?id=${params.id}`;
  //   console.log(" → request URL:", url);

  //   fetch(url)
  //     .then(res => {
  //       console.log(" ← status:", res.status);
  //       return res.json();
  //     })
  //     .then(data => {
  //       console.log(" ← response data:", data);
  //       if (res.ok) {
  //         setProduct(data);
  //       } else {
  //         setError(data.message || "Unknown error");
  //       }
  //     })
  //     .catch(err => {
  //       console.error("Fetch error:", err);
  //       setError(err.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      image: product.colors[selectedColor],
      quantity: 1,
    };
    dispatch(addItem(cartItem));
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}>
        <Typography variant="h6" color="text.primary">
          Loading product...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md" sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}>
        <Typography variant="h6" color="text.primary">
          Product not found
        </Typography>
      </Container>
    );
  }

  const qrValue = JSON.stringify({
    name: product.name,
    price: product.price,
    color: selectedColor,
    size: selectedSize
  });

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{
        py: 4,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        [theme.breakpoints.up('md')]: { justifyContent: 'center' }
      }}>
        <Grid container spacing={isMobile ? 2 : 4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: 'background.paper',
            }}>
              <Box sx={{
                width: '100%',
                height: isMobile ? 300 : 400,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: theme.palette.mode === 'dark' ? '#1A1A1A' : '#F3F4F6',
                borderRadius: 2,
                mb: 2
              }}>
                <img
                  src={product.colors[selectedColor]}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Box sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                py: 1,
                px: 1
              }}>
                {Object.keys(product.colors).map((color) => (
                  <Button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    variant="outlined"
                    sx={{
                      minWidth: 80,
                      height: 80,
                      p: 0.5,
                      borderWidth: 2,
                      borderColor: selectedColor === color ?
                        'primary.main' : 'divider',
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: 'primary.light',
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    <img
                      src={product.colors[color]}
                      alt={color}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 6
                      }}
                    />
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={3}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              color: 'text.primary'
            }}>
              <Typography variant="h4" fontWeight={600}>
                {product.name}
              </Typography>

              <Typography variant="h5" fontWeight={600}>
                ${Number(product.price).toFixed(2)}
              </Typography>

              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                  Color
                </Typography>
                <ToggleButtonGroup
                  value={selectedColor}
                  exclusive
                  fullWidth
                  onChange={(e, newColor) => newColor && setSelectedColor(newColor)}
                  sx={{ gap: 1 }}
                >
                  {Object.keys(product.colors).map((color) => (
                    <ToggleButton
                      key={color}
                      value={color}
                      sx={{
                        px: 2,
                        py: 1,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        textTransform: 'capitalize',
                        color: 'text.primary',
                      }}
                    >
                      {color}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                  Size
                </Typography>
                <ToggleButtonGroup
                  value={selectedSize}
                  exclusive
                  fullWidth
                  onChange={(e, newSize) => newSize && setSelectedSize(newSize)}
                  sx={{ gap: 1 }}
                >
                  {product.sizes.map((size) => (
                    <ToggleButton
                      key={size}
                      value={size}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        color: 'text.primary',
                      }}
                    >
                      {size}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {product.description}
              </Typography>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleAddToCart}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: theme.shadows[3]
                  }
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>

          {/* QR Code Section */}
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{
              p: 3,
              height: '100%',
              borderRadius: 3,
              bgcolor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography variant="h6" fontWeight={600} textAlign="center">
                Share Product
              </Typography>
              <Box sx={{
                bgcolor: theme.palette.mode === 'dark' ? '#1A1A1A' : '#F3F4F6',
                p: 2,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center'
              }}>
                <QRCode
                  value={qrValue}
                  size={isMobile ? 160 : 200}
                  bgColor={theme.palette.mode === 'dark' ? '#1A1A1A' : '#F3F4F6'}
                  fgColor={theme.palette.text.primary}
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                  Product Details
                </Typography>
                <Box sx={{
                  display: 'grid',
                  gap: 1.5,
                  gridTemplateColumns: 'repeat(2, 1fr)'
                }}>
                  <DetailItem label="Name" value={product.name} />
                  <DetailItem label="Price" value={`$${Number(product.price).toFixed(2)}`} />
                  <DetailItem label="Color" value={selectedColor} />
                  <DetailItem label="Size" value={selectedSize} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

const DetailItem = ({ label, value }) => (
  <>
    <Typography variant="body2" color="text.secondary">
      {label}:
    </Typography>
    <Typography variant="body2" fontWeight={500}>
      {value}
    </Typography>
  </>
);

export default ProductPage;