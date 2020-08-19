import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../components/Link';
import ontola from '../../ontology/ontola';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import { MenuTypes } from './types';

const MenuItemCardRow = ({
  isActive,
  href,
  name,
  onClick,
}) => (
  <li>
    <Link isActive={isActive} to={href.value} onClick={onClick}>
      {name.value}
    </Link>
  </li>
);

MenuItemCardRow.type = MenuTypes;

MenuItemCardRow.topology = cardRowTopology;

MenuItemCardRow.mapDataToProps = {
  href: ontola.href,
  name: schema.name,
};

MenuItemCardRow.propTypes = {
  href: linkType,
  isActive: PropTypes.func,
  name: linkType,
  onClick: PropTypes.func,
};

export default register(MenuItemCardRow);
