import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ListItemStyle } from '../../styles';

const OurAdvantages = () => {
  return (
    <Container>
      <Grid item container xs sx={{mt: 4, mb: 4}}>
        <Typography variant='h3' color="primary" textAlign="center">Our advantages</Typography>
        <Grid item style={ListItemStyle} sx={{pt: 3}}>
            <StarIcon fontSize="small"/>
            <Typography style={{margin: '0 0 0 15px'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in massa porttitor, condimentum neque vel,
              finibus libero. Aenean sollicitudin luctus eros, eget sodales purus aliquet.
            </Typography>
        </Grid>
        <Grid item style={ListItemStyle}>
          <StarIcon fontSize="small"/>
          <Typography style={{margin: '0 0 0 15px'}}>
            Integer feugiat ornare mi sit amet cursus. Nam nisi dui, consectetur tincidunt congue eget, imperdiet.
          </Typography>
        </Grid>
        <Grid item style={ListItemStyle}>
          <StarIcon fontSize="small"/>
          <Typography style={{margin: '0 0 0 15px'}}>
            Nunc tempor aliquet diam non maximus. Ut bibendum tincidunt felis, in tristique nisi. Duis felis tortor,
            consequat sed lacus eu.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OurAdvantages;