import React, { PropTypes } from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.object,
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
