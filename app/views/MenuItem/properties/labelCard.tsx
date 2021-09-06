import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Image from '../../../components/Image';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { cardFloatTopology } from '../../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../../topologies/Container/ContainerFloat';

interface MenuItemLabelCardProps {
  linkedProp: Literal;
  label?: Literal;
}

const MenuItemLabelCard: FC<MenuItemLabelCardProps> = ({
  label,
  linkedProp,
}) => {
  const [image] = useProperty(schema.image);

  if (!image) {
    return (
      <div>
        {(label ?? linkedProp).value}
      </div>
    );
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

export default register(MenuItemLabelCard);
