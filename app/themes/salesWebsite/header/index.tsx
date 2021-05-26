import { makeStyles } from '@material-ui/styles';
import React from 'react';

import Navbar from '../../../topologies/Navbar';
import SalesNavBarContent from '../../../components/SalesWebsite/SalesNavBarContent';

const useAppBarOverrides = makeStyles({
  wrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '10px',
  },
});

const SalesWebsiteHeader = (): JSX.Element => {
  const appBarOverrides = useAppBarOverrides();

  return (
    <Navbar classes={appBarOverrides}>
      <SalesNavBarContent />
    </Navbar>
  );
};

export default SalesWebsiteHeader;
