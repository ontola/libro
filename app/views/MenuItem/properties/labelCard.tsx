import { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import Image from '../../../components/Image';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { cardFloatTopology } from '../../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../../topologies/Container/ContainerFloat';

interface MenuItemLabelCardProps {
  image?: NamedNode;
  linkedProp: Literal;
  label?: Literal;
}

const MenuItemLabelCard: FC<MenuItemLabelCardProps> = ({
  image,
  label,
  linkedProp,
}) => {
  if (!image) {
    return <div>{(label ?? linkedProp).value}</div>;
  }

  return (
    <Image
      ariaLabel={label?.value}
      linkedProp={image}
    />
  );
};

MenuItemLabelCard.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemLabelCard.property = schema.name;

MenuItemLabelCard.topology = [cardFloatTopology, containerFloatTopology];

MenuItemLabelCard.mapDataToProps = {
  image: schema.image,
};

export default register(MenuItemLabelCard);
