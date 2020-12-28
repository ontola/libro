import React from 'react';

import Navbar from '../../../topologies/Navbar';
import NavBarContent from '../../../components/NavBarContent';

const style = { flexGrow: 1 };

const CommonHeader = () => (
  <Navbar>
    <NavBarContent>
      <div style={style} />
    </NavBarContent>
  </Navbar>
);

export default CommonHeader;
