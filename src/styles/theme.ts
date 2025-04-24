import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#007AFF',
      light: '#5AA9FF',
      dark: '#0055B3',
    },
    secondary: {
      main: '#5856D6',
      light: '#7D7BFF',
      dark: '#3D3B9E',
    },
    background: {
      default: '#F5F5F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1D1D1F',
      secondary: '#86868B',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
}); 