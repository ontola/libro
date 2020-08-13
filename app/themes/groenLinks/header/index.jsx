import React from 'react';
import { Link } from 'react-router-dom';

import NavBarContent from '../../../components/NavBarContent';
import Navbar from '../../../topologies/Navbar';

const GroenLinksHeader = () => {
  const [logo, setLogo] = React.useState();

  React.useEffect(() => {
    import('./Icon').then((encoded) => setLogo(encoded.default));
  });

  return (
    <Navbar>
      <NavBarContent>
        <Link to="/">
          <img
            src={logo}
            style={{
              flex: '0 1 250px',
              maxHeight: '1.8em',
            }}
          />
        </Link>
      </NavBarContent>
    </Navbar>
  );
};

export default GroenLinksHeader;
