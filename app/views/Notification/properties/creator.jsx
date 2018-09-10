import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  LinkedResourceContainer,
  Property,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => (
  <LinkedResourceContainer subject={linkedProp} topology={NS.argu('detail')}>
    <Property label={NS.schema('image')} />
  </LinkedResourceContainer>
);

Creator.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Creator,
  NS.argu('Notification'),
  NS.schema('creator'),
  [
    undefined,
    NS.argu('card'),
    NS.argu('cardMain'),
    NS.argu('container'),
    NS.argu('detail'),
    NS.argu('sidebar'),
  ]
);
