import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { Heading } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => (
  <Heading size="3">{linkedProp.value}</Heading>
);

Creator.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Creator,
  NS.argu('Notification'),
  NS.schema('name'),
  [
    undefined,
    NS.argu('collection'),
    NS.argu('card'),
    NS.argu('cardFixed'),
    NS.argu('cardMain'),
  ]
);
