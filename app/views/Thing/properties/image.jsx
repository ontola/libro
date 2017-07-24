import { LinkedObjectContainer } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const FABase = 'http://fontawesome.io/icon/';
const propTypes = {
  linkedProp: linkedPropVal,
};

const ThingImageProp = ({ linkedProp }) => {
  if (!linkedProp) {
    return null;
  } else if (linkedProp &&
    Object.keys(linkedProp).length === 0 &&
    linkedProp.constructor === Object
  ) {
    return <div>image</div>;
  } else if (typeof linkedProp === 'string' && linkedProp.startsWith(FABase)) {
    return <FontAwesome name={linkedProp.split(FABase)[1]} />;
  }
  return (
    <LinkedObjectContainer
      object={linkedProp}
      topology="argu:detail"
    />
  );
};

ThingImageProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ThingImageProp,
  'http://schema.org/Thing',
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18']
);

LinkedRenderStore.registerRenderer(
  ThingImageProp,
  'http://schema.org/Thing',
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18'],
  'argu:sidebar'
);

export default ThingImageProp;
