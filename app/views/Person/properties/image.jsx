import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer } from 'link-redux';
import React, { PropTypes } from 'react';

const propTypes = {
  linkedProp: PropTypes.object,
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
