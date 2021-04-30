import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { IsActiveCheck } from '../../components/Link';
import UnorderedList from '../../components/UnorderedList';
import ontola from '../../ontology/ontola';
import { CardRow } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';

import { MenuTypes } from './types';

interface MenuItemCardAppendixProps {
  isActive: IsActiveCheck;
  onClick: () => void;
}

const MenuItemCardAppendix: FC<MenuItemCardAppendixProps> = ({
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

export default register(MenuItemCardAppendix);
