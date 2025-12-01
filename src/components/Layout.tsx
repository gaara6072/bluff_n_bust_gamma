import React from 'react';
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Global, css } from '@emotion/react';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00e5ff', // Cyan accent
        },
        secondary: {
            main: '#ff0055', // Pink accent
        },
        background: {
            default: '#0a0a0a',
            paper: '#1a1a1a',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 700,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '12px 24px',
                    fontSize: '1rem',
                    boxShadow: '0 4px 14px 0 rgba(0, 229, 255, 0.3)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px 0 rgba(0, 229, 255, 0.5)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(45deg, #00e5ff 30%, #00b8d4 90%)',
                },
                containedSecondary: {
                    background: 'linear-gradient(45deg, #ff0055 30%, #ff4081 90%)',
                    boxShadow: '0 4px 14px 0 rgba(255, 0, 85, 0.3)',
                    '&:hover': {
                        boxShadow: '0 6px 20px 0 rgba(255, 0, 85, 0.5)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(26, 26, 26, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                            borderColor: '#00e5ff',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#00e5ff',
                        },
                    },
                },
            },
        },
    },
});

const globalStyles = css`
  body {
    background: radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%);
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0a0a0a;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Global styles={globalStyles} />
            <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', py: 4 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {children}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Layout;
