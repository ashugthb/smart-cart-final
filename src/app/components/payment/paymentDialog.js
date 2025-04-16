'use client';
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    Box,
    Grid,
    IconButton,
    useTheme
} from '@mui/material';
import QRCode from 'react-qr-code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PaymentDialog = ({ open, onClose, totalPrice }) => {
    const theme = useTheme();
    const upiId = "yourstore@upi"; // Replace with your UPI ID
    const paymentLink = `upi://pay?pa=${upiId}&pn=Your%20Store&am=${totalPrice}&cu=INR`;

    const handleCopyUPI = () => {
        navigator.clipboard.writeText(upiId);
        // Add snackbar/notification here if needed
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    boxShadow: theme.shadows[24],
                    backgroundImage: 'none'
                }
            }}
        >
            <DialogTitle sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 700,
                py: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                textAlign: 'center',
                fontSize: '1.5rem'
            }}>
                Complete Payment
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            bgcolor: 'background.default',
                            p: 3,
                            borderRadius: 3,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            border: `1px solid ${theme.palette.divider}`,
                            boxShadow: theme.shadows[2]
                        }}>
                            <QRCode
                                value={paymentLink}
                                size={256}
                                bgColor={theme.palette.background.default}
                                fgColor={theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000'}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: 280
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            height: '100%',
                            justifyContent: 'space-between'
                        }}>
                            <Box>
                                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'text.primary' }}>
                                    Payment Summary
                                </Typography>

                                <Divider sx={{
                                    mb: 3,
                                    borderColor: 'divider',
                                    borderWidth: 1
                                }} />

                                <Box sx={{ mb: 3 }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 1.5
                                    }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Total Amount:
                                        </Typography>
                                        <Typography variant="h5" fontWeight={800} color="text.primary">
                                            ₹{totalPrice.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 1.5 }}>
                                        Payment Method
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        bgcolor: 'background.default',
                                        p: 2,
                                        borderRadius: 2,
                                        border: `1px solid ${theme.palette.divider}`,
                                        boxShadow: theme.shadows[1]
                                    }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
                                                UPI Payment
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {upiId}
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            onClick={handleCopyUPI}
                                            sx={{
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    color: 'primary.main',
                                                    bgcolor: 'rgba(255,255,255,0.05)'
                                                }
                                            }}
                                        >
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{
                                bgcolor: 'background.default',
                                p: 2,
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.shadows[1]
                            }}>
                                <Typography variant="body1" fontWeight={600} color="text.primary" gutterBottom>
                                    Payment Instructions
                                </Typography>
                                <Box component="ul" sx={{
                                    pl: 2,
                                    mb: 0,
                                    '& li': {
                                        typography: 'body2',
                                        color: 'text.secondary',
                                        mb: 1,
                                        '&:last-child': { mb: 0 }
                                    }
                                }}>
                                    <li>Scan QR code with any UPI app</li>
                                    <li>Or copy UPI ID to make payment</li>
                                    <li>Complete within 10 minutes</li>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{
                p: 3,
                borderTop: `1px solid ${theme.palette.divider}`,
                bgcolor: 'background.default',
                justifyContent: 'space-between'
            }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="inherit"
                    sx={{
                        borderRadius: '12px',
                        px: 4,
                        py: 1.5,
                        borderWidth: 2,
                        fontWeight: 600,
                        '&:hover': {
                            borderWidth: 2,
                            bgcolor: 'rgba(255,255,255,0.05)'
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{
                        borderRadius: '12px',
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        boxShadow: theme.shadows[3],
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: theme.shadows[6]
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Confirm Payment
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentDialog;