import React from 'react';

import Navbar from '../../../topologies/Navbar';
import NavBarContent from '../../../components/NavBarContent';

const CommonHeader = () => (
  <Navbar>
    <NavBarContent>
      <div style={{ flexGrow: 1 }} />
    </NavBarContent>
  </Navbar>
);

export default CommonHeader;
