import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import NavBarContent from '../../../components/NavBarContent';
import Navbar from '../../../topologies/Navbar';

const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: '1em',
  },
}));

const DexesHeader = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container maxWidth="xl">
        <Navbar
          float
        >
          <NavBarContent />
        </Navbar>
      </Container>
    </div>
  );
};

export default DexesHeader;
