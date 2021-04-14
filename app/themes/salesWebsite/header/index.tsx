import { makeStyles } from '@material-ui/styles';
import React from 'react';

import Navbar from '../../../topologies/Navbar';
import NavBarContent from '../../../components/NavBarContent';

const useStyles = makeStyles({
  content: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
});

const SalesWebsiteHeader = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Navbar>
      <NavBarContent>
        <div className={classes.content} />
      </NavBarContent>
    </Navbar>
  );
};

export default SalesWebsiteHeader;
