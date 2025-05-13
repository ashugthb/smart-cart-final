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
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import NavBar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";

const ProductPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const url = `/.netlify/functions/getProducts?id=${id}`;
      console.log("🕵️ fetching product for id:", id);
      console.log(" → URL:", url);

      try {
        const response = await fetch(url);
        console.log(" ← status:", response.status);

        const data = await response.json();
        console.log(" ← data:", data);

        if (!response.ok) {
          throw new Error(data.message || "Unknown error");
        }

        setProduct(data);

        // pick the first available color & size
        const colors = Object.keys(data.colors || {});
        if (colors.length) setSelectedColor(colors[0]);
        if (data.sizes?.length) setSelectedSize(data.sizes[0]);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Container
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3
        }}
      >
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: `${product.id}-${selectedColor}-${selectedSize}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        image: product.colors[selectedColor],
        quantity: 1,
      })
    );
  };

  const qrValue = JSON.stringify({
    name: product.name,
    price: product.price,
    color: selectedColor,
    size: selectedSize,
  });

  return (
    <>
      <NavBar />

      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          minHeight: "100vh",
          bgcolor: "background.default"
        }}
      >
        <Grid container spacing={isMobile ? 2 : 4}>
          {/* IMAGE + THUMBNAILS */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "background.paper"
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: isMobile ? 300 : 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor:
                    theme.palette.mode === "dark" ? "#1A1A1A" : "#F3F4F6",
                  borderRadius: 2,
                  mb: 2
                }}
              >
                <img
                  src={product.colors[selectedColor]}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  overflowX: "auto",
                  py: 1
                }}
              >
                {Object.entries(product.colors).map(([color, url]) => (
                  <Button
                    key={color}
                    variant={
                      selectedColor === color ? "contained" : "outlined"
                    }
                    onClick={() => setSelectedColor(color)}
                    sx={{ minWidth: 60, height: 60, p: 0 }}
                  >
                    <img
                      src={url}
                      alt={color}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 4
                      }}
                    />
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* DETAILS & ADD TO CART */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="h4" fontWeight={600}>
                {product.name}
              </Typography>

              <Typography variant="h5" fontWeight={600}>
                ${product.price.toFixed(2)}
              </Typography>

              {/* Color selector */}
              <Box>
                <Typography gutterBottom>Color</Typography>
                <ToggleButtonGroup
                  value={selectedColor}
                  exclusive
                  fullWidth
                  onChange={(_, v) => v && setSelectedColor(v)}
                >
                  {Object.keys(product.colors).map((c) => (
                    <ToggleButton key={c} value={c}>
                      {c}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              {/* Size selector */}
              <Box>
                <Typography gutterBottom>Size</Typography>
                <ToggleButtonGroup
                  value={selectedSize}
                  exclusive
                  fullWidth
                  onChange={(_, v) => v && setSelectedSize(v)}
                >
                  {product.sizes.map((s) => (
                    <ToggleButton key={s} value={s}>
                      {s}
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
                sx={{ py: 2, borderRadius: 2, fontWeight: 600 }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>

          {/* QR + DETAILS */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
                gap: 2
              }}
            >
              <Typography textAlign="center" fontWeight={600}>
                Share Product
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 2,
                  bgcolor:
                    theme.palette.mode === "dark" ? "#1A1A1A" : "#F3F4F6",
                  borderRadius: 2
                }}
              >
                <QRCode
                  value={qrValue}
                  size={isMobile ? 120 : 160}
                  fgColor={theme.palette.text.primary}
                />
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1.5
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Name:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Color:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {selectedColor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Size:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {selectedSize}
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

export default ProductPage;
