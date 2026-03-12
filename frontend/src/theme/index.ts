import { createTheme } from '@mui/material/styles';

const baseColors = {
  backgroundColor: '#FFFDF7',
  paper: '#EDE7DC',
  primary: {
    main: '#A1B09A',
    dark: '#2B471B',
    contrastText: '#1B2418',
  },
  secondary: {
    main: '#C57C57',
    dark: '#9A5836',
    light: '#E7CCC1',
    contrastText: '#2B1B14',
  },
  rose: '#E3A5A1',
  whiteText: '#FFFAFA',
  navyGrey: '#2F3542',
  mutedGrey: '#57606F',
};

export const academicArchiveTheme = createTheme({
  palette: {
    background: {
      default: baseColors.backgroundColor,
      paper: baseColors.paper,
    },
    common: {
      white: baseColors.whiteText,
    },
    primary: {
      main: baseColors.primary.main,
      dark: baseColors.primary.dark,
      contrastText: baseColors.primary.contrastText,
    },
    secondary: {
      main: baseColors.secondary.main,
      dark: baseColors.secondary.dark,
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
      color: baseColors.primary.main,
    },
    h2: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 700,
      color: baseColors.primary.main,
    },
    h3: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: baseColors.primary.dark,
    },
    h4: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: baseColors.primary.dark,
    },
    h5: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      color: baseColors.primary.main,
    },
    h6: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      letterSpacing: '0.5px',
      color: baseColors.primary.main,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
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
          backgroundColor: baseColors.secondary.main,
          '&:hover': {
            backgroundColor: baseColors.secondary.dark,
            color: baseColors.whiteText,
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
