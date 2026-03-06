import { createTheme } from '@mui/material/styles';

export const academicArchiveTheme = createTheme({
  palette: {
    background: {
      default: '#FAF7E6', // The "Aged Parchment" desk surface
      paper: '#FDFCF5', // A slightly lighter "fresh page" for Cards
    },
    primary: {
      main: '#3C4043', // The Graphite/Slate primary
      contrastText: '#FFFDF0',
    },
    secondary: {
      main: '#4A69BD', // The "Faded Ink" Blue
    },
    text: {
      primary: '#2F3542', // Deep, readable Navy-Grey
      secondary: '#57606F', // Muted grey for labels and captions
    },
    divider: 'rgba(47, 53, 66, 0.12)', // Subtle lines that look like notebook rules
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Lora", "serif"', fontWeight: 700, color: '#3C4043' },
    h2: { fontFamily: '"Lora", "serif"', fontWeight: 700, color: '#3C4043' },
    h3: { fontFamily: '"Lora", "serif"', fontWeight: 600, color: '#3C4043' },
    h4: { fontFamily: '"Lora", "serif"', fontWeight: 600, color: '#3C4043' },
    h5: { fontFamily: '"Lora", "serif"', fontWeight: 500, color: '#3C4043' },
    h6: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
    button: { textTransform: 'none', fontWeight: 600 }, // Less "yelling" than all-caps
    subtitle1: {
      fontFamily: '"Lora", "serif"',
      fontStyle: 'italic',
      color: '#57606F', // Muted Navy-Grey
    },
  },
  shape: {
    borderRadius: 2, // Sharper corners feel more like a bound book
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: 'outlined', // Outlines > Shadows for this aesthetic
      },
      styleOverrides: {
        root: {
          borderColor: 'rgba(60, 64, 67, 0.2)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // Standard MD2 "Outlined" text fields
        size: 'small', // Keeps manual entry forms compact and dense
      },
    },
  },
});
