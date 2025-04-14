import React from "react";
import { Box, Typography, Link, Button, Grid, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "common.black",
        color: "common.white",
        py: 6,
        px: { xs: 2, md: 8 },
        mt: 'auto'
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* Logo Section */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "grey.800",
                borderRadius: 1,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" }
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
                "&:hover": { color: "grey.400" },
                transition: "color 0.2s ease",
                cursor: "pointer"
              }}
            >
              SMART CART
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "grey.500", lineHeight: 1.6 }}>
            Revolutionizing retail through intelligent shopping solutions.
          </Typography>
        </Grid>

        {/* Links Section */}
        <Grid item xs={6} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Link href="#" sx={linkStyle}>Home</Link>
                <Link href="#" sx={linkStyle}>About</Link>
                <Link href="#" sx={linkStyle}>Products</Link>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Link href="#" sx={linkStyle}>Documentation</Link>
                <Link href="#" sx={linkStyle}>Support</Link>
                <Link href="#" sx={linkStyle}>Contact</Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* CTA Section */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "grey.300" }}>
              Stay Updated
            </Typography>

          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: "grey.800" }} />

      {/* Bottom Footer */}
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="body2" sx={{ color: "grey.600" }}>
            © 2023-2024 Smart Cart. All rights reserved.
          </Typography>
        </Grid>
        <Grid item>
          <Link href="#" sx={{ ...linkStyle, display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "grey.600", borderRadius: "50%" }} />
            Source Code
          </Link>
        </Grid>
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "grey.600" }}>
              Created by Ashvajeet & Aditi
            </Typography>
            {/* <Box sx={{ width: 24, height: 24, bgcolor: "grey.600", borderRadius: 1 }} /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const linkStyle = {
  color: "grey.400",
  textDecoration: "none",
  "&:hover": {
    color: "common.white",
    textDecoration: "underline",
    textUnderlineOffset: 4
  },
  transition: "all 0.2s ease",
  width: "fit-content"
};

export default Footer;