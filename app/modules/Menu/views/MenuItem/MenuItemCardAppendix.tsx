import {
  FC,
  Property,
  array,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import { IsActiveCheck } from '../../../Common/components/Link';
import UnorderedList from '../../../Common/components/UnorderedList';
import { cardAppendixTopology } from '../../../Common/topologies';
import { CardRow } from '../../../Common/topologies/Card';
import ontola from '../../../Kernel/ontology/ontola';

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
  const menuItems = useIds(array(ontola.menuItems));

  if (menuItems.length == 0) {
    return null;
  }

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
