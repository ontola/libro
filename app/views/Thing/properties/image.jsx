import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { NS } from '../../../helpers/LinkedRenderStore';

const FABase = 'http://fontawesome.io/icon/';
const propTypes = {
  linkedProp: linkedPropType,
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
    <LinkedObjectContainer object={linkedProp} />
  );
};

ThingImageProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ThingImageProp,
  NS.schema('Thing'),
  [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
  [undefined, NS.argu('sidebar'), NS.argu('sidebarBlock')]
);
