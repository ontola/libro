import { Property, Resource } from 'link-redux';
import React from 'react';

import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';

const NavbarNavigationsMenu = (): JSX.Element => (
  <Resource
    forceRender
    subject={frontendIRI}
  >
    <Property label={ontola.navigationsMenu}>
      <div className="NavBarContent__items">
        <div
          style={{
            display: 'flex',
            height: '100%',
          }}
        />
        <Property label={ontola.menuItems} />
      </div>
    </Property>
  </Resource>
);

export default NavbarNavigationsMenu;
