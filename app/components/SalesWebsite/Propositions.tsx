import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import Container from '../../topologies/Container';

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
        <Resource subject={app.ns('info#propositions')} />
      </Grid>
    </Container>
  );
};
