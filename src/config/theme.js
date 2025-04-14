import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
    palette: {
        mode,
        ...(mode === 'dark'
            ? { // Dark theme
                primary: { main: '#000000' },
                secondary: { main: '#ffffff' },
                background: {
                    default: '#121212',
                    paper: '#1E1E1E',
                },
                text: {
                    primary: '#ffffff',
                    secondary: 'rgba(255, 255, 255, 0.7)',
                },
            }
            : { // Light theme
                primary: { main: '#ffffff' },
                secondary: { main: '#000000' },
                background: {
                    default: '#f5f5f5',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#000000',
                    secondary: 'rgba(0, 0, 0, 0.7)',
                },
            }),
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'dark' ? '#000000' : '#ffffff',
                    color: mode === 'dark' ? '#ffffff' : '#000000',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px',
                },
            },
        },
    },
});