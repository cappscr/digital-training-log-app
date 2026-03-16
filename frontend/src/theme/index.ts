import { alpha, createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

const baseColors = {
  lightGreyOffWhite: '#fafafa',
  snow: '#fffafa',
  sageTeal: '#608b84',
  slateBlueGrey: '#60678b',
};

export const glacierFloraTheme = createTheme({
  palette: {
    background: {
      default: blueGrey['50'],
      paper: baseColors.lightGreyOffWhite,
    },
    common: {
      white: baseColors.snow,
      black: blueGrey['900'],
    },
    primary: {
      main: blueGrey['500'],
      light: blueGrey['100'],
      dark: blueGrey['800'],
      contrastText: baseColors.snow,
    },
    secondary: {
      main: baseColors.sageTeal,
    },
    text: {
      primary: blueGrey['900'],
      secondary: blueGrey['700'],
    },
    divider: 'rgba(47, 53, 66, 0.12)', // Subtle lines that look like notebook rules
  },
  typography: (palette) => ({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 700,
      color: palette.primary.dark,
    },
    h2: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 700,
      color: palette.primary.dark,
    },
    h3: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: palette.primary.dark,
    },
    h4: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 600,
      color: palette.primary.dark,
    },
    h5: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      color: palette.primary.dark,
    },
    h6: {
      fontFamily: '"Lora", "serif"',
      fontWeight: 500,
      letterSpacing: '0.5px',
      color: palette.primary.dark,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: '"Lora", "serif"',
      fontStyle: 'italic',
      color: palette.primary.main,
    },
  }),
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 18,
          ...(ownerState.color === 'secondary' &&
            ownerState.variant === 'contained' && {
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.light, 0.8),
              },
            }),
          ...(ownerState.color === 'secondary' &&
            ownerState.variant === 'outlined' && {
              borderColor: theme.palette.secondary.light,
              color: theme.palette.secondary.light,
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.light, 0.2),
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
