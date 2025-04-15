"use client"
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Paper,
  FormControl,
  FormLabel,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const theme = useTheme();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    colors: [{ colorName: '', imageUrl: '' }],
    sizes: [],
  });

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (index, field, value) => {
    const newColors = [...product.colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setProduct({ ...product, colors: newColors });
  };

  const handleAddColor = () => {
    setProduct(prev => ({
      ...prev,
      colors: [...prev.colors, { colorName: '', imageUrl: '' }]
    }));
  };

  const handleSizeChange = (size) => {
    const newSizes = product.sizes.includes(size)
      ? product.sizes.filter(s => s !== size)
      : [...product.sizes, size];
    setProduct(prev => ({ ...prev, sizes: newSizes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Keep your existing submission logic
  };

  // Style configuration for Add Color button
  const addButtonStyles = {
    borderColor: theme.palette.mode === 'dark' ? '#666' : '#999',
    color: theme.palette.mode === 'dark' ? theme.palette.text.primary : '#444',
    '&:hover': {
      borderColor: theme.palette.mode === 'dark' ? '#888' : '#666',
      backgroundColor: theme.palette.mode === 'dark' ?
        'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary',
      p: 4
    }}>
      <Paper elevation={3} sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 4,
        bgcolor: 'background.paper'
      }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 4, textAlign: 'center' }}
        >
          Add New Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price (USD)"
                name="price"
                type="number"
                value={product.price}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            {product.colors.map((color, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Color Name"
                      value={color.colorName}
                      onChange={(e) => handleColorChange(index, 'colorName', e.target.value)}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Image URL"
                      value={color.imageUrl}
                      onChange={(e) => handleColorChange(index, 'imageUrl', e.target.value)}
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddColor}
                variant="outlined"
                sx={{
                  mt: 1,
                  ...addButtonStyles
                }}
              >
                Add Color
              </Button>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Available Sizes</FormLabel>
                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 1,
                  flexWrap: 'wrap',
                  '& .MuiChip-root': {
                    transition: 'all 0.2s ease',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'transparent'
                  }
                }}>
                  {availableSizes.map(size => (
                    <Chip
                      key={size}
                      label={size}
                      onClick={() => handleSizeChange(size)}
                      color={product.sizes.includes(size) ? 'primary' : 'default'}
                      variant={product.sizes.includes(size) ? 'filled' : 'outlined'}
                      sx={{
                        borderColor: theme.palette.mode === 'dark' ?
                          'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
                      }}
                    />
                  ))}
                </Box>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Dashboard;