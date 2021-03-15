import React from 'react';

import Navbar from '../../../topologies/Navbar';
import NavBarContent from '../../../components/NavBarContent';

const style = {
  backgroundColor: 'white',
  flexGrow: 1,
};

const SalesWebsiteHeader = (): JSX.Element => (
  <Navbar>
    <NavBarContent>
      <div style={style} />
    </NavBarContent>
  </Navbar>
);

export default SalesWebsiteHeader;
