import { makeStyles } from '@mui/styles';
import React from 'react';

import SalesNavBarContent from '../../../components/SalesWebsite/SalesNavBarContent';
import Navbar from '../../../topologies/Navbar';

const useAppBarOverrides = makeStyles({
  root: {
    display: 'flex',
    height: 'unset !important',
    minHeight: 'unset !important',
  },
  wrapper: {
    '@supports not (backdrop-filter: blur(3px))': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

const SalesWebsiteHeader: React.FC = () => {
  const appBarOverrides = useAppBarOverrides();

  return (
    <Navbar
      fullWidth
      classes={appBarOverrides}
    >
      <SalesNavBarContent />
    </Navbar>
  );
};

export default SalesWebsiteHeader;
