import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ListItemStyle } from '../../styles';

const OurAdvantages = () => {
  return (
    <Container>
      <Grid container sx={{ mt: 4, mb: 4 }}>
        <Grid item xs textAlign="center">
          <Typography variant="h3" color="primary" fontSize={{ xs: '30px', sm: '40px' }}>
            Our advantages
          </Typography>
        </Grid>

        <Grid item style={ListItemStyle} sx={{ pt: 3 }}>
          <StarIcon fontSize="small" />
          <Typography style={{ margin: '0 0 0 15px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in massa porttitor, condimentum neque vel,
            finibus libero. Aenean sollicitudin luctus eros, eget sodales purus aliquet.
          </Typography>
        </Grid>
        <Grid item style={ListItemStyle}>
          <StarIcon fontSize="small" />
          <Typography style={{ margin: '0 0 0 15px' }}>
            Integer feugiat ornare mi sit amet cursus. Nam nisi dui, consectetur tincidunt congue eget, imperdiet.
          </Typography>
        </Grid>
        <Grid item style={ListItemStyle}>
          <StarIcon fontSize="small" />
          <Typography style={{ margin: '0 0 0 15px' }}>
            Nunc tempor aliquet diam non maximus. Ut bibendum tincidunt felis, in tristique nisi. Duis felis tortor,
            consequat sed lacus eu.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OurAdvantages;
