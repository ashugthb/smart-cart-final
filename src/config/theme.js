import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
    palette: {
        mode,
        contrastThreshold: 4.5, // WCAG AA compliance
        ...(mode === 'dark'
            ? { // Dark theme - Deep Sea (Enhanced Contrast)
                primary: {
                    main: '#2E4A6B', // More accessible navy blue
                    light: '#3A5A7B',
                    dark: '#1E334D',
                    contrastText: '#F0F8FF',
                },
                secondary: {
                    main: '#5C9EAD',
                    light: '#7AB4C2',
                    dark: '#407885',
                    contrastText: '#0A1929',
                },
                background: {
                    default: '#121212', // True black base
                    paper: '#1E1E1E',
                },
                text: {
                    primary: '#E8F4FD', // Higher contrast white
                    secondary: '#B0C4DE', // Softer blue-gray
                    disabled: '#6D7C8D',
                },
                error: {
                    main: '#FF6B6B',
                    contrastText: '#2D0000',
                },
                success: {
                    main: '#88D498',
                    contrastText: '#00290D',
                },
                warning: {
                    main: '#FFD93D',
                    contrastText: '#2D2200',
                },
                info: {
                    main: '#6C9BCF',
                    contrastText: '#00152D',
                },
                divider: 'rgba(255,255,255,0.12)',
            }
            : { // Light theme - Morning Mist (Enhanced Readability)
                primary: {
                    main: '#2E5C9E', // More vibrant blue
                    light: '#4A7AB4',
                    dark: '#1E3D6B',
                    contrastText: '#FFFFFF',
                },
                secondary: {
                    main: '#3A5A7B',
                    light: '#5C7B9E',
                    dark: '#1E334D',
                    contrastText: '#FFFFFF',
                },
                background: {
                    default: '#F8F9FA', // Cooler off-white
                    paper: '#FFFFFF',
                },
                text: {
                    primary: '#1A1A1A', // Deeper black
                    secondary: '#4A4A4A',
                    disabled: '#A0A0A0',
                },
                error: {
                    main: '#D32F2F',
                    contrastText: '#FFFFFF',
                },
                success: {
                    main: '#2E7D32',
                    contrastText: '#FFFFFF',
                },
                warning: {
                    main: '#ED6C02',
                    contrastText: '#FFFFFF',
                },
                info: {
                    main: '#1565C0',
                    contrastText: '#FFFFFF',
                },
                divider: 'rgba(0,0,0,0.12)',
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
            fontWeight: 800,
            fontSize: '2.8rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.2rem',
            lineHeight: 1.3,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'text.primary',
        },
        button: {
            fontWeight: 600,
            letterSpacing: '0.025em',
            fontSize: '0.9375rem',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    scrollBehavior: 'smooth',
                },
                body: {
                    overscrollBehaviorY: 'contain',
                },
                '& ::selection': {
                    backgroundColor: mode === 'dark' ? 'primary.dark' : 'primary.light',
                    color: mode === 'dark' ? '#FFF' : '#000',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.16)',
                    backdropFilter: 'blur(12px)',
                    backgroundImage: 'none',
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '12px',
                    padding: '12px 24px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontWeight: 600,
                    '&:active': {
                        transform: 'scale(0.98)',
                    },
                },
                contained: {
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    },
                },
                outlined: {
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
                        backgroundColor: mode === 'dark'
                            ? 'rgba(255,255,255,0.04)'
                            : 'rgba(0,0,0,0.02)',
                    },
                },
                text: {
                    '&:hover': {
                        backgroundColor: mode === 'dark'
                            ? 'rgba(255,255,255,0.04)'
                            : 'rgba(0,0,0,0.02)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                },
                elevation1: {
                    boxShadow: mode === 'dark'
                        ? '0 4px 16px rgba(0,0,0,0.32)'
                        : '0 4px 16px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: mode === 'dark'
                            ? 'rgba(255,255,255,0.1)'
                            : 'rgba(0,0,0,0.04)',
                        transform: 'scale(1.08)',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    '&.Mui-focused': {
                        boxShadow: `0 0 0 3px ${mode === 'dark'
                            ? 'rgba(92, 158, 173, 0.3)'
                            : 'rgba(46, 92, 158, 0.2)'}`,
                    },
                },
                input: {
                    '&::placeholder': {
                        opacity: 0.6,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: mode === 'dark'
                            ? '0 12px 24px rgba(0,0,0,0.4)'
                            : '0 12px 24px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'divider',
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: 'hover',
            },
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    transition: 'color 0.2s ease',
                },
            },
        },
    },
    shape: {
        borderRadius: 12,
    },
    spacing: 8,
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1600,
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
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
    },
    zIndex: {
        appBar: 1300,
        drawer: 1200,
        modal: 1400,
        snackbar: 1500,
        tooltip: 1600,
    },
});