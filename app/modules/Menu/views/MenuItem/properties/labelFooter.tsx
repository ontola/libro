import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import argu from '../../../../Argu/ontology/argu';
import ontola from '../../../../../ontology/ontola';
import { footerTopology } from '../../../../../topologies';
import Heading, { HeadingSize, HeadingVariant } from '../../../../Common/components/Heading';

interface MenuItemLabelFooterProps {
  linkedProp: Literal;
  nested: boolean;
}

const MenuItemLabelFooter: FC<MenuItemLabelFooterProps> = ({ linkedProp, nested }) => {
  if (nested) {
    return (
      <div className="">
        {linkedProp.value}
      </div>
    );
  }

  return (
    <Heading
      size={HeadingSize.MD}
      variant={HeadingVariant.Navbar}
    >
      {linkedProp.value}
    </Heading>
  );
};

MenuItemLabelFooter.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemLabelFooter.property = schema.name;

MenuItemLabelFooter.topology = footerTopology;

export default register(MenuItemLabelFooter);
