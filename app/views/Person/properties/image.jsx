import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const PersonImageProp = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology={NS.argu('voteBubble')}
  />
);

PersonImageProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  PersonImageProp,
  [NS.schema('Person'), NS.aod('Persons')],
  [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
  NS.argu('detail')
);

LinkedRenderStore.registerRenderer(
  PersonImageProp,
  [NS.schema('Person'), NS.aod('Persons')],
  [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
  NS.argu('voteBubble')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => (
    <LinkedObjectContainer object={linkedProp} />
  ),
  [NS.schema('Person'), NS.aod('Persons')],
  [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
  NS.argu('sidebar')
);

export default PersonImageProp;
