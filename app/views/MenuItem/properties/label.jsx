import LinkedRenderStore from 'link-lib';
import { link, linkedPropType } from 'link-redux';
import React from 'react';

import { Image } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  image: linkedPropType,
  label: linkedPropType,
};

const Label = ({ image, label }) => (
  <span style={{ margin: '.5em' }}>
    <Image ariaLabel={label.value} linkedProp={image} />
  </span>
);

Label.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.argu('label'), NS.schema('image')])(Label),
  [
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('ActionsMenu'),
    NS.argu('FollowMenu'),
    NS.argu('ShareMenu'),
  ],
  NS.argu('label'),
  NS.argu('cardMain')
);
