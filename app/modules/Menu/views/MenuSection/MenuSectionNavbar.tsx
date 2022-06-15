import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import argu from '../../../Argu/ontology/argu';
import ontola from '../../../../ontology/ontola';
import { navbarTopology } from '../../../../topologies';

const MenuSection = (): JSX.Element => (
  <div data-testid="MenuSection-menu-section">
    <Property label={schema.name} />
    <Property
      forceRender
      label={ontola.menuItems}
    />
  </div>
);

MenuSection.type = argu.MenuSection;

MenuSection.topology = navbarTopology;

export default register(MenuSection);
