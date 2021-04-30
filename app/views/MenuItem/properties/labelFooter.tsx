import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import Heading, { HeadingSize, HeadingVariant } from '../../../components/Heading';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { footerTopology } from '../../../topologies/Footer';

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

MenuItemLabelFooter.mapDataToProps = {
  image: schema.image,
  name: schema.name,
};

export default register(MenuItemLabelFooter);
