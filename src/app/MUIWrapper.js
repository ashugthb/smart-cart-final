'use client';

import { useTheme } from '../providers/ThemeProvider';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const themeSettings = (mode) => createTheme({
    palette: {
        mode,
        ...(mode === 'dark' ? {
            primary: { main: '#000000' },
            secondary: { main: '#ffffff' },
            background: { default: '#121212', paper: '#1E1E1E' }
        } : {
            primary: { main: '#ffffff' },
            secondary: { main: '#000000' },
            background: { default: '#f5f5f5', paper: '#ffffff' }
        }),
    },
    typography: {
        fontFamily: 'var(--font-geist-sans)',
        button: {
            textTransform: 'none'
        }
    }
});

export default function MUIWrapper({ children }) {
    const { mode } = useTheme();
    const theme = themeSettings(mode);

    return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}