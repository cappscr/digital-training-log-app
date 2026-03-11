import { createTheme } from '@mui/material/styles';

const baseColors = {
  backgroundColor: '#FFFDF7',
  paper: '#EDE7DC',
  primary: {
    main: '#2A7A54',
    light: '#86C2A8',
    dark: '#114024',
  },
  secondary: {
    main: '#97576E', // '#b44774'
    light: '#CC98AA', // '#e3bdd3'
    dark: '#40112D', // '#8e3f64'
  },
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
      light: baseColors.primary.light,
      dark: baseColors.primary.dark,
    },
    secondary: {
      main: baseColors.secondary.main,
      light: baseColors.secondary.light,
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
      color: baseColors.primary.main,
    },
    h4: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: baseColors.primary.main,
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
      fontWeight: 600,
      color: baseColors.whiteText,
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
