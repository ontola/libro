import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import UnorderedList from '../../components/UnorderedList';
import ontola from '../../ontology/ontola';
import { CardRow } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';

import { MenuTypes } from './types';

const MenuItemCardAppendix = ({
  onClick,
  isActive,
}) => (
  <CardRow backdrop>
    <CardContent endSpacing>
      <UnorderedList>
        <Property
          childProps={{
            isActive,
            onClick,
          }}
          label={ontola.menuItems}
        />
      </UnorderedList>
    </CardContent>
  </CardRow>
);

MenuItemCardAppendix.type = MenuTypes;

MenuItemCardAppendix.topology = cardAppendixTopology;

MenuItemCardAppendix.propTypes = {
  isActive: PropTypes.func,
  onClick: PropTypes.func,
};

export default register(MenuItemCardAppendix);
