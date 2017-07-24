import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const PersonImageProp = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology="argu:voteBubble"
  />
);

PersonImageProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  PersonImageProp,
  ['schema:Person', 'aod:Persons'],
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18'],
  'argu:detail'
);

LinkedRenderStore.registerRenderer(
  PersonImageProp,
  ['schema:Person', 'aod:Persons'],
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18'],
  'argu:voteBubble'
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => (
    <LinkedObjectContainer object={linkedProp} />
  ),
  ['schema:Person', 'aod:Persons'],
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18'],
  'argu:sidebar'
);

export default PersonImageProp;
