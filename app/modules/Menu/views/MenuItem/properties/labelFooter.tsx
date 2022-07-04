import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import argu from '../../../../Argu/ontology/argu';
import Heading, { HeadingSize, HeadingVariant } from '../../../../Common/components/Heading';
import { footerTopology } from '../../../../Common/topologies/Footer';
import ontola from '../../../../Kernel/ontology/ontola';

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
