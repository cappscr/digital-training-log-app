import { alpha, createTheme } from '@mui/material/styles';

const baseColors = {
  whisperWhite: '#F9FAFB',
  lightGrey: '#E5E7EB',
  snow: '#FFFAFA',
  mountainMist: '#5A6058',
  lightTeal: '#80CBC4',
  teal: '#00796B',
  darkTeal: '#004D40',
  evenDarkerTeal: '#003932',
  raspberry: '#D81B60',
  youthfulPink: '#F06292',
  deepPink: '#880E4F',
};

export const glacierFloraTheme = createTheme({
  palette: {
    background: {
      default: baseColors.whisperWhite,
      paper: baseColors.lightGrey,
    },
    common: {
      white: baseColors.snow,
    },
    primary: {
      main: baseColors.teal,
      light: baseColors.lightTeal,
      dark: baseColors.darkTeal,
      contrastText: baseColors.snow,
    },
    secondary: {
      main: baseColors.raspberry,
      light: baseColors.youthfulPink,
      dark: baseColors.deepPink,
      contrastText: baseColors.snow,
    },
    text: {
      primary: baseColors.evenDarkerTeal,
      secondary: baseColors.mountainMist,
    },
    divider: 'rgba(47, 53, 66, 0.12)', // Subtle lines that look like notebook rules
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 700,
      color: baseColors.darkTeal,
    },
    h2: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 700,
      color: baseColors.darkTeal,
    },
    h3: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: baseColors.darkTeal,
    },
    h4: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: baseColors.darkTeal,
    },
    h5: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      color: baseColors.darkTeal,
    },
    h6: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      letterSpacing: '0.5px',
      color: baseColors.darkTeal,
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
        root: ({ ownerState }) => ({
          borderRadius: 18,
          ...(ownerState.variant === 'contained' && {
            backgroundColor: baseColors.darkTeal,
            color: baseColors.snow,
            '&:hover': {
              backgroundColor: alpha(baseColors.darkTeal, 0.8),
            },
          }),
          ...(ownerState.variant === 'outlined' && {
            borderColor: baseColors.darkTeal,
            color: baseColors.darkTeal,
            '&:hover': {
              backgroundColor: alpha(baseColors.teal, 0.15),
            },
          }),
          ...(ownerState.color === 'secondary' &&
            ownerState.variant === 'contained' && {
              backgroundColor: baseColors.raspberry,
              color: baseColors.snow,
              '&:hover': {
                backgroundColor: alpha(baseColors.raspberry, 0.8),
              },
            }),
          ...(ownerState.color === 'secondary' &&
            ownerState.variant === 'outlined' && {
              borderColor: baseColors.deepPink,
              color: baseColors.deepPink,
              '&:hover': {
                backgroundColor: alpha(baseColors.deepPink, 0.2),
              },
            }),
        }),
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
