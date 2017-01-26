import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const IsPartOf = ({ linkedProp }) => {
  if (linkedProp && Object.keys(linkedProp).length === 0 && linkedProp.constructor === Object) {
    return <div>parent</div>;
  }
  return (
    <LinkedObjectContainer
      object={linkedProp}
      topology="parent"
      forceRender
      fetch
    />
  );
};

IsPartOf.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  IsPartOf,
  'http://schema.org/CreativeWork',
  'http://schema.org/isPartOf'
);

export default IsPartOf;
