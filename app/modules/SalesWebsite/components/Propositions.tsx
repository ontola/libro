import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Property } from 'link-redux';
import React from 'react';

import sales from '../ontology/sales';
import Container from '../../../topologies/Container';

const useStyles = makeStyles({
  propositionContainer: {
    marginBottom: 30,
    marginTop: 45,
  },
});

export const Propositions = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Container>
      <Grid
        container
        className={classes.propositionContainer}
        direction="row"
      >
        <Property label={sales.propositions} />
      </Grid>
    </Container>
  );
};