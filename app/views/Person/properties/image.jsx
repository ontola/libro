import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Image = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology="voteBubble"
  />
);

Image.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Image,
  ['schema:Person', 'aod:Persons'],
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18'],
  'detail'
);
LinkedRenderStore.registerRenderer(
  Image,
  ['schema:Person', 'aod:Persons'],
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18'],
  'voteBubble'
);

export default Image;
