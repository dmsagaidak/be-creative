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
            main: 'rgb(47, 79, 79)',
        }
     },
      typography: {
        fontFamily: 'Lato, sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
      }
});

export default theme;