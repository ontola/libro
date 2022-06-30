import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from 'react';

import NavBarContent from '../../../modules/NavBar/components/NavBarContent';
import Navbar from '../../../modules/NavBar/topologies/Navbar';

const CommonHeader = (): JSX.Element => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  return (
    <Navbar elevated={trigger}>
      <NavBarContent />
    </Navbar>
  );
};

export default CommonHeader;
