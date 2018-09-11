import LinkedRenderStore from 'link-lib';
import { link, linkType } from 'link-redux';
import React from 'react';

import { Image } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { cardFloatTopology } from '../../../topologies/Card/CardFloat';

const propTypes = {
  image: linkType,
  label: linkType,
};

const MenuItemLabel = ({ image, label }) => (
  <Image ariaLabel={label.value} linkedProp={image} />
);

MenuItemLabel.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.schema('name'), NS.schema('image')])(MenuItemLabel),
  [
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ],
  NS.schema('name'),
  cardFloatTopology
);
