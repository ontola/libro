import LinkedRenderStore from 'link-lib';
import { link, linkedPropType } from 'link-redux';
import React from 'react';

import { Image } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  image: linkedPropType,
  label: linkedPropType,
};

const MenuItemLabel = ({ image, label }) => (
  <Image ariaLabel={label.value} linkedProp={image} />
);

MenuItemLabel.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.argu('label'), NS.schema('image')])(MenuItemLabel),
  [
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ],
  NS.argu('label'),
  NS.argu('cardMain')
);
