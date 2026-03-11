import { createTheme } from '@mui/material/styles';

const baseColors = {
  agedParchment: '#FAF7E6',
  paper: '#FDFCF5',
  primary: '#3C4043',
  secondary: {
    main: '#4A69BD',
    50: '#e6e9f5',
    100: '#c0c9e8',
    200: '#97a6d8',
    300: '#6c84c8',
    500: '#1f4fb2',
    600: '#1747a8',
    700: '#043e9d',
    800: '#003491',
    900: '#00237c',
  },
  navyGrey: '#2F3542',
  mutedGrey: '#57606F',
};

export const academicArchiveTheme = createTheme({
  palette: {
    background: {
      default: baseColors.agedParchment, // The "Aged Parchment" desk surface
      paper: baseColors.paper, // A slightly lighter "fresh page" for Cards
    },
    primary: {
      main: baseColors.primary, // The Graphite/Slate primary
      contrastText: '#FFFDF0',
    },
    secondary: {
      main: baseColors.secondary.main, // The "Faded Ink" Blue
      50: baseColors.secondary[50],
      100: baseColors.secondary[100],
      200: baseColors.secondary[200],
      300: baseColors.secondary[300],
      500: baseColors.secondary[500],
      600: baseColors.secondary[600],
      700: baseColors.secondary[700],
      800: baseColors.secondary[800],
      900: baseColors.secondary[900],
    },
    text: {
      primary: baseColors.navyGrey, // Deep, readable Navy-Grey
      secondary: baseColors.mutedGrey, // Muted grey for labels and captions
    },
    divider: 'rgba(47, 53, 66, 0.12)', // Subtle lines that look like notebook rules
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 700,
      color: baseColors.secondary[500],
    },
    h2: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 700,
      color: baseColors.secondary[500],
    },
    h3: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: baseColors.secondary[500],
    },
    h4: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: baseColors.secondary[500],
    },
    h5: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      color: baseColors.secondary[500],
    },
    h6: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      letterSpacing: '0.5px',
      color: baseColors.secondary[500],
    },
    button: { textTransform: 'none', fontWeight: 600 }, // Less "yelling" than all-caps
    subtitle1: {
      fontFamily: '"Lora", "serif"',
      fontStyle: 'italic',
      color: '#57606F', // Muted Navy-Grey
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
