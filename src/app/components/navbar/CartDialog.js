'use client';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography, Divider, useTheme } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../store/slices/cartSlice';
import PaymentDialog from '../payment/paymentDialog';

const CartDialog = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { items, totalPrice } = useSelector((state) => state.cart);
    const [paymentOpen, setPaymentOpen] = useState(false);

    const handleIncrement = (item) => {
        dispatch(addItem(item));
    };

    const handleDecrement = (item) => {
        dispatch(removeItem(item.id));
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const handleCheckout = () => {
        setPaymentOpen(true);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: 'background.paper',
                    backgroundImage: 'none',
                    boxShadow: theme.shadows[24],
                }
            }}
        >
            <DialogTitle sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                borderBottom: `1px solid ${theme.palette.divider}`,
                fontWeight: 600,
                py: 2,
            }}>
                Shopping Cart ({items.length})
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                {items.length === 0 ? (
                    <Typography sx={{
                        p: 3,
                        textAlign: 'center',
                        color: 'text.secondary'
                    }}>
                        Your cart is empty
                    </Typography>
                ) : (
                    <>
                        {items.map((item) => (
                            <Box key={item.id}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    transition: 'background-color 0.2s',
                                    '&:hover': {
                                        bgcolor: theme.palette.action.hover
                                    }
                                }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            objectFit: 'cover',
                                            borderRadius: theme.shape.borderRadius,
                                            border: `1px solid ${theme.palette.divider}`,
                                            backgroundColor: theme.palette.background.default
                                        }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Size: {item.size}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Color: {item.color}
                                        </Typography>
                                        <Typography variant="body1" fontWeight={500} mt={1}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5
                                    }}>
                                        <IconButton
                                            onClick={() => handleDecrement(item)}
                                            size="small"
                                            disabled={item.quantity <= 1}
                                            sx={{
                                                border: `1px solid ${theme.palette.divider}`,
                                                color: 'text.primary',
                                                '&:disabled': {
                                                    opacity: 0.5
                                                },
                                                '&:hover:not(:disabled)': {
                                                    bgcolor: theme.palette.action.hover,
                                                    color: 'primary.main'
                                                }
                                            }}
                                        >
                                            <Remove fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{
                                            minWidth: 30,
                                            textAlign: 'center',
                                            fontWeight: 500,
                                            color: 'text.primary'
                                        }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleIncrement(item)}
                                            size="small"
                                            sx={{
                                                border: `1px solid ${theme.palette.divider}`,
                                                color: 'text.primary',
                                                '&:hover': {
                                                    bgcolor: theme.palette.action.hover,
                                                    color: 'primary.main'
                                                }
                                            }}
                                        >
                                            <Add fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleRemoveItem(item.id)}
                                            sx={{
                                                color: 'error.main',
                                                '&:hover': {
                                                    bgcolor: theme.palette.error.main + '22'
                                                }
                                            }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Divider />
                            </Box>
                        ))}
                        <Box sx={{
                            p: 2,
                            bgcolor: 'background.default',
                            borderTop: `1px solid ${theme.palette.divider}`
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                bgcolor: 'background.paper',
                                p: 2,
                                borderRadius: theme.shape.borderRadius,
                                boxShadow: theme.shadows[1]
                            }}>
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6" color="primary.contrastText" fontWeight={700}>
                                    ${totalPrice.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    </>
                )}
            </DialogContent>

            <DialogActions sx={{
                p: 2,
                borderTop: `1px solid ${theme.palette.divider}`,
                gap: 2,
                bgcolor: 'background.default'
            }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="primary"
                    sx={{
                        flex: 1,
                        borderWidth: 2,
                        borderColor: 'primary.contrastText',
                        color: 'primary.contrastText',
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            borderWidth: 2,
                            boxShadow: (theme) => theme.shadows[2]
                        },
                        '&:active': {
                            transform: 'scale(0.98)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Continue Shopping
                </Button>
                <PaymentDialog
                    open={paymentOpen}
                    onClose={() => setPaymentOpen(false)}
                    totalPrice={totalPrice}
                />
                {items.length > 0 && (
                    <Button
                        variant="contained"
                        onClick={handleCheckout}
                        color="primary"
                        sx={{
                            flex: 1,
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: theme.shadows[3]
                            }
                        }}
                    >
                        Checkout
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default CartDialog;