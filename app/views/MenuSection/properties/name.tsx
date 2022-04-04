import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import MenuSectionLabel from '../../../components/MenuSectionLabel';
import argu from '../../../ontology/argu';
import { navbarTopology } from '../../../topologies';

const MenuSectionName = ({ linkedProp }: PropertyProps): JSX.Element => (
  <MenuSectionLabel linkedProp={linkedProp} />
);

MenuSectionName.type = argu.MenuSection;

MenuSectionName.property = schema.name;

MenuSectionName.topology = navbarTopology;

export default register(MenuSectionName);
