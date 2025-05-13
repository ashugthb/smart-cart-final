"use client";
import React, { useState, useEffect } from "react";
import {
    Grid, Typography, Box, Button, IconButton, useTheme,
    Container, Chip, Accordion, AccordionSummary, AccordionDetails,
    Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import {
    Add, Delete, ExpandMore, Close, Label, ShoppingBasket
} from "@mui/icons-material";

const WishlistManager = () => {
    const theme = useTheme();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [newCategory, setNewCategory] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '', price: '', category: '', specifications: []
    });
    const [currentSpec, setCurrentSpec] = useState({ key: '', value: '' });
    const [openDialog, setOpenDialog] = useState({ category: false, product: false });

    // Data persistence
    useEffect(() => {
        const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        if (savedCategories.length === 0) {
            savedCategories.push({ id: 'uncategorized', name: 'Uncategorized' });
        }
        setCategories(savedCategories);
        setProducts(savedProducts);
    }, []);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('products', JSON.stringify(products));
    }, [categories, products]);

    // Category functions
    const handleAddCategory = () => {
        if (newCategory) {
            const newCat = {
                id: newCategory.toLowerCase().replace(/\s+/g, '-'),
                name: newCategory
            };
            setCategories([...categories, newCat]);
            setNewCategory('');
            setOpenDialog({ ...openDialog, category: false });
        }
    };

    const deleteCategory = (categoryId) => {
        if (categoryId === 'uncategorized') return;
        setCategories(categories.filter(c => c.id !== categoryId));
        setProducts(products.filter(p => p.category !== categoryId));
    };

    // Product functions
    const handleAddProduct = () => {
        if (!newProduct.name) return alert('Product name required');
        const product = {
            ...newProduct,
            id: Date.now(),
            category: newProduct.category || 'uncategorized',
            specifications: Object.fromEntries(
                newProduct.specifications.map(({ key, value }) => [key, value])
            )
        };
        setProducts([...products, product]);
        setNewProduct({ name: '', price: '', category: '', specifications: [] });
        setOpenDialog({ ...openDialog, product: false });
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4, minHeight: "100vh", bgcolor: 'background.default' }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    My Shopping List
                    <Typography component="span" sx={{ ml: 2, color: 'text.secondary', fontSize: '1.2rem' }}>
                        ({products.length} items)
                    </Typography>
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog({ ...openDialog, category: true })}>
                    Manage Categories
                </Button>
            </Box>

            {/* Category Chips */}
            <Box sx={{ mb: 4, display: 'flex', gap: 1, overflowX: 'auto', py: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
                <Chip
                    label="All"
                    onClick={() => setSelectedCategory('all')}
                    color={selectedCategory === 'all' ? 'primary' : 'default'}
                    sx={{
                        fontWeight: 600,
                        minWidth: 100,
                        bgcolor: selectedCategory === 'all' ? 'primary.light' : 'action.selected'
                    }}
                />
                {categories.map(category => (
                    <Chip
                        key={category.id}
                        label={category.name}
                        onClick={() => setSelectedCategory(category.id)}
                        onDelete={() => deleteCategory(category.id)}
                        deleteIcon={<Close />}
                        color={selectedCategory === category.id ? 'primary' : 'default'}
                        sx={{
                            fontWeight: 600,
                            minWidth: 120,
                            bgcolor: selectedCategory === category.id ? 'primary.light' : 'action.selected'
                        }}
                    />
                ))}
            </Box>

            {/* Product Grid */}
            <Grid container spacing={3}>
                {products.filter(p => selectedCategory === 'all' || p.category === selectedCategory).map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Box sx={{
                            p: 3,
                            height: '100%',
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: 3
                            }
                        }}>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    color: 'error.main',
                                    '&:hover': {
                                        bgcolor: 'error.light'
                                    }
                                }}
                                onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                            >
                                <Delete />
                            </IconButton>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                                {product.name}
                            </Typography>
                            {product.price && (
                                <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600, mb: 2 }}>
                                    {product.price}
                                </Typography>
                            )}
                            <Chip
                                label={categories.find(c => c.id === product.category)?.name || 'Uncategorized'}
                                icon={<Label fontSize="small" />}
                                size="small"
                                sx={{
                                    mb: 2,
                                    bgcolor: 'primary.light',
                                    color: 'primary.contrastText',
                                    '& .MuiChip-icon': {
                                        color: 'primary.contrastText'
                                    }
                                }}
                            />
                            <Accordion sx={{
                                bgcolor: 'background.default',
                                boxShadow: 'none',
                                border: `1px solid ${theme.palette.divider}`
                            }}>
                                <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'text.secondary' }} />}>
                                    <Typography variant="body2" color="text.secondary">
                                        Specifications
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1}>
                                        {Object.entries(product.specifications || {}).map(([key, value]) => (
                                            <Grid item xs={12} key={key}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    py: 0.5
                                                }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        {key}:
                                                    </Typography>
                                                    <Typography variant="body2" sx={{
                                                        color: 'text.secondary',
                                                        maxWidth: '60%',
                                                        textAlign: 'right'
                                                    }}>
                                                        {value}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Empty State */}
            {products.length === 0 && (
                <Box sx={{
                    textAlign: 'center',
                    py: 8,
                    bgcolor: 'background.paper',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    mt: 4
                }}>
                    <ShoppingBasket sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                        Your shopping list is empty
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={() => setOpenDialog({ ...openDialog, product: true })}
                    >
                        Add Your First Item
                    </Button>
                </Box>
            )}

            {/* Floating Action Button */}
            <Fab
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    '&:hover': {
                        transform: 'scale(1.1)'
                    }
                }}
                onClick={() => setOpenDialog({ ...openDialog, product: true })}
            >
                <Add />
            </Fab>

            {/* Product Dialog */}
            <Dialog
                open={openDialog.product}
                onClose={() => setOpenDialog({ ...openDialog, product: false })}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: 'background.paper'
                    }
                }}
            >
                <DialogTitle sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                    Add New Product
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            InputLabelProps={{ sx: { color: 'text.secondary' } }}
                            InputProps={{
                                sx: {
                                    color: 'text.primary',
                                    bgcolor: 'background.default'
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            InputLabelProps={{ sx: { color: 'text.secondary' } }}
                            InputProps={{
                                sx: {
                                    color: 'text.primary',
                                    bgcolor: 'background.default'
                                }
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: 'text.secondary' }}>Category</InputLabel>
                            <Select
                                value={newProduct.category}
                                label="Category"
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: 'text.primary',
                                        bgcolor: 'background.default'
                                    }
                                }}
                            >
                                <MenuItem
                                    value=""
                                    onClick={() => setOpenDialog({ ...openDialog, category: true })}
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 600,
                                        '&:hover': {
                                            bgcolor: 'primary.light'
                                        }
                                    }}
                                >
                                    <Add sx={{ mr: 1 }} /> Create New Category
                                </MenuItem>
                                {categories.map(category => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                        sx={{ color: 'text.primary' }}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.primary' }}>
                                Specifications
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <TextField
                                    label="Key"
                                    fullWidth
                                    value={currentSpec.key}
                                    onChange={(e) => setCurrentSpec({ ...currentSpec, key: e.target.value })}
                                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                                    InputProps={{
                                        sx: {
                                            color: 'text.primary',
                                            bgcolor: 'background.default'
                                        }
                                    }}
                                />
                                <TextField
                                    label="Value"
                                    fullWidth
                                    value={currentSpec.value}
                                    onChange={(e) => setCurrentSpec({ ...currentSpec, value: e.target.value })}
                                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                                    InputProps={{
                                        sx: {
                                            color: 'text.primary',
                                            bgcolor: 'background.default'
                                        }
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        if (currentSpec.key && currentSpec.value) {
                                            setNewProduct({
                                                ...newProduct,
                                                specifications: [...newProduct.specifications, currentSpec]
                                            });
                                            setCurrentSpec({ key: '', value: '' });
                                        }
                                    }}
                                >
                                    Add
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {newProduct.specifications.map((spec, index) => (
                                    <Chip
                                        key={index}
                                        label={`${spec.key}: ${spec.value}`}
                                        onDelete={() => setNewProduct({
                                            ...newProduct,
                                            specifications: newProduct.specifications.filter((_, i) => i !== index)
                                        })}
                                        sx={{
                                            bgcolor: 'background.default',
                                            border: `1px solid ${theme.palette.divider}`
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{
                    p: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    bgcolor: 'background.default'
                }}>
                    <Button
                        onClick={() => setOpenDialog({ ...openDialog, product: false })}
                        sx={{
                            color: 'text.primary',
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                                bgcolor: 'action.hover'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleAddProduct}
                        disabled={!newProduct.name}
                        sx={{
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            }
                        }}
                    >
                        Add Product
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Category Dialog */}
            <Dialog
                open={openDialog.category}
                onClose={() => setOpenDialog({ ...openDialog, category: false })}
                PaperProps={{
                    sx: {
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: 'background.paper'
                    }
                }}
            >
                <DialogTitle sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                    Manage Categories
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, minWidth: 300 }}>
                        <TextField
                            fullWidth
                            label="New Category"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            InputLabelProps={{ sx: { color: 'text.secondary' } }}
                            InputProps={{
                                sx: {
                                    color: 'text.primary',
                                    bgcolor: 'background.default'
                                }
                            }}
                        />
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            maxHeight: 200,
                            overflowY: 'auto',
                            mt: 2
                        }}>
                            {categories.map(category => (
                                <Chip
                                    key={category.id}
                                    label={category.name}
                                    onDelete={() => deleteCategory(category.id)}
                                    sx={{ m: 0.5 }}
                                />
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenDialog({ ...openDialog, category: false })}
                        sx={{
                            color: 'text.primary',
                            '&:hover': {
                                bgcolor: 'action.hover'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleAddCategory}
                        disabled={!newCategory}
                        sx={{
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            }
                        }}
                    >
                        Add Category
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default WishlistManager;