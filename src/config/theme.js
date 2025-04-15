import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
    palette: {
        mode,
        ...(mode === 'dark'
            ? { // Dark theme - Deep Sea
                primary: {
                    main: '#2A3B4D', // Deep navy blue
                    contrastText: '#E0F2FE',
                },
                secondary: {
                    main: '#5C9EAD', // Soft teal
                    contrastText: '#1A1A1A',
                },
                background: {
                    default: '#1A1A1A', // Soft black
                    paper: '#2D2D2D', // Dark gray
                },
                text: {
                    primary: '#E0F2FE', // Off-white
                    secondary: '#9EADC6', // Cool gray
                },
                error: {
                    main: '#FF6B6B', // Coral red
                },
                success: {
                    main: '#88D498', // Sage green
                },
                warning: {
                    main: '#FFD93D', // Soft yellow
                },
                info: {
                    main: '#6C9BCF', // Sky blue
                },
                divider: '#3D4D5E',
            }
            : { // Light theme - Morning Mist
                primary: {
                    main: '#5C9EAD', // Soft teal
                    contrastText: '#FFFFFF',
                },
                secondary: {
                    main: '#2A3B4D', // Deep navy
                    contrastText: '#FFFFFF',
                },
                background: {
                    default: '#F8F8F8', // Warm off-white
                    paper: '#FFFFFF', // Pure white
                },
                text: {
                    primary: '#2D2D2D', // Dark gray
                    secondary: '#666666', // Medium gray
                },
                error: {
                    main: '#FF5252', // Bright coral
                },
                success: {
                    main: '#7BC47F', // Fresh green
                },
                warning: {
                    main: '#FFC107', // Amber
                },
                info: {
                    main: '#2196F3', // Classic blue
                },
                divider: '#E0E0E0',
            }),
    },
    typography: {
        fontFamily: [
            'var(--font-geist-sans)',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            letterSpacing: '-0.015em',
        },
        button: {
            fontWeight: 600,
            letterSpacing: '0.01em',
        },
        body1: {
            lineHeight: 1.6,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(8px)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                contained: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                        transform: 'translateY(-1px)',
                    },
                },
                outlined: {
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                        backgroundColor: 'rgba(0,0,0,0.03)',
                    },
                },
                text: {
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: mode === 'dark'
                            ? 'rgba(255,255,255,0.08)'
                            : 'rgba(0,0,0,0.05)',
                        transform: 'scale(1.1)',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    '&.Mui-focused': {
                        backgroundColor: mode === 'dark'
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(0,0,0,0.03)',
                        boxShadow: `0 0 0 2px ${mode === 'dark' ? '#5C9EAD' : '#2A3B4D'}40`,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
    },
    shape: {
        borderRadius: 10,
    },
    spacing: 8,
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
    },
    zIndex: {
        appBar: 1200,
        drawer: 1100,
    },
});