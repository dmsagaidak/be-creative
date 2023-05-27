import theme from './theme';

export const boxShadow = '2px 0px 6px 0px rgba(0, 0, 0, 0.77)';

export const pageTopStyle = {
  backgroundColor: theme.palette.primary.light,
  color: '#fff',
  borderTopRightRadius: '7px',
  borderTopLeftRadius: '7px',
  paddingLeft: '7px',
  paddingRight: '7px',
};

export const pageBodyStyle = {
  paddingTop: '8px',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
  borderBottomRightRadius: '7px',
  borderBottomLeftRadius: '7px',
  paddingLeft: '20px',
  paddingRight: '20px',
};

export const ListItemStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 0 25px 0 ',
};

export const headingFS = {xs: '20px', sm: '30px', md: '40px', lg: '55px'}

export const pageSubheading = {
  fontSize: '20px',
  fontWeight: 700,
  paddingTop: '7px',
  paddingBottom: '7px',
};

export const projectItemStyle = {
  boxShadow,
  marginTop: '7px',
  width: '70vw',
  cursor: 'pointer',
}
