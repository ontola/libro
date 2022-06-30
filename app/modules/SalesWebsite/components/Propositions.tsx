import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Property } from 'link-redux';
import React from 'react';

import Container from '../../Common/topologies/Container';
import sales from '../ontology/sales';

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
