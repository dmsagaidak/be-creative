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
     }
});

export default theme;