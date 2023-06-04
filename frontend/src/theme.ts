import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
  palette: {
    primary: {
      main: '#2f4f4f',
      light: '#69b3b3',
    },
    secondary: {
      main: 'rgb(52, 67, 102)',
      light: '#6f98f7',
    },
    success: {
      main: 'rgb(7, 135, 67)',
    },
    info: {
      main: '#6e6e6e',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export default theme;
