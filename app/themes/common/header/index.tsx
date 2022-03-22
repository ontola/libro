import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import React from 'react';

import NavBarContent from '../../../components/NavBarContent';
import Navbar from '../../../topologies/Navbar';

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
