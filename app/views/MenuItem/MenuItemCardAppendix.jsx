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
}) => {
  const childProps = React.useMemo(() => ({
    isActive,
    onClick,
  }), [isActive, onClick]);

  return (
    <CardRow backdrop>
      <CardContent endSpacing>
        <UnorderedList>
          <Property
            childProps={childProps}
            label={ontola.menuItems}
          />
        </UnorderedList>
      </CardContent>
    </CardRow>
  );
};

MenuItemCardAppendix.type = MenuTypes;

MenuItemCardAppendix.topology = cardAppendixTopology;

MenuItemCardAppendix.propTypes = {
  isActive: PropTypes.func,
  onClick: PropTypes.func,
};

export default register(MenuItemCardAppendix);
