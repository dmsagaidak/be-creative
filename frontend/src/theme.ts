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
            light: 'rgb(105, 179, 179)',
        },
       secondary: {
          main: 'rgb(52, 67, 102)',
          light: 'rgb(111, 152, 247)',
       },
       success: {
          main: 'rgb(7, 135, 67)'
       },
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