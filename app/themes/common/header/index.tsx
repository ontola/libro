import React from 'react';

import NavBarContent from '../../../components/NavBarContent';
import Navbar from '../../../topologies/Navbar';

const style = { flexGrow: 1 };

const CommonHeader = (): JSX.Element => (
  <Navbar>
    <NavBarContent>
      <div style={style} />
    </NavBarContent>
  </Navbar>
);

export default CommonHeader;
