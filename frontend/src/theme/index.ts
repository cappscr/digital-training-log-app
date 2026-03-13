import { createTheme } from '@mui/material/styles';

const baseColors = {
  warmIvory: '#FFFDF7',
  beige: '#EDE7DC',
  olive: '#A1B09A',
  darkOlive: '#2B471B',
  nightMoss: '#1B2418',
  terracotta: '#C57B57',
  rust: '#9A5836',
  roastedCoffee: '#2B1B14',
  rose: '#E3A5A1',
  snow: '#FFFAFA',
  mountainMist: '#5A6058',
};

export const academicArchiveTheme = createTheme({
  palette: {
    background: {
      default: baseColors.warmIvory,
      paper: baseColors.beige,
    },
    common: {
      white: baseColors.snow,
    },
    primary: {
      main: baseColors.olive,
      dark: baseColors.darkOlive,
      contrastText: baseColors.nightMoss,
    },
    secondary: {
      main: baseColors.terracotta,
      dark: baseColors.rust,
      contrastText: baseColors.roastedCoffee,
    },
    text: {
      primary: baseColors.darkOlive,
      secondary: baseColors.mountainMist,
    },
    divider: 'rgba(47, 53, 66, 0.12)', // Subtle lines that look like notebook rules
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 700,
      color: baseColors.darkOlive,
    },
    h2: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 700,
      color: baseColors.darkOlive,
    },
    h3: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: baseColors.darkOlive,
    },
    h4: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: baseColors.darkOlive,
    },
    h5: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      color: baseColors.darkOlive,
    },
    h6: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      letterSpacing: '0.5px',
      color: baseColors.darkOlive,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: '"Lora", "serif"',
      fontStyle: 'italic',
      color: baseColors.mountainMist,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: baseColors.terracotta,
          '&:hover': {
            backgroundColor: baseColors.rust,
            color: baseColors.snow,
          },
        },
      },
    },
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
