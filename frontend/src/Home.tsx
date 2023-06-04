import React from 'react';
import { Container, Grid } from '@mui/material';
import ProjectsBlock from './components/ProjectsBlock/ProjectsBlock';
import TopBlock from './components/TopBlock/TopBlock';
import OurAdvantages from './components/OurAdvantages/OurAdvantages';

const Home = () => {
  return (
    <>
      <Container>
        <TopBlock />
      </Container>
      <Grid container direction="column" style={{ marginTop: '90px' }}>
        <Grid item xs>
          <ProjectsBlock />
        </Grid>
        <Grid item xs>
          <OurAdvantages />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
