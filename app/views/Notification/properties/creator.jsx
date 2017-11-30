import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  LinkedObjectContainer,
  Property,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => (
  <LinkedObjectContainer object={linkedProp} topology={NS.argu('detail')}>
    <Property label={NS.schema('image')} />
  </LinkedObjectContainer>
);

Creator.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Creator,
  NS.argu('Notification'),
  NS.schema('creator'),
  [undefined, NS.argu('collection'), NS.argu('sidebar')]
);
