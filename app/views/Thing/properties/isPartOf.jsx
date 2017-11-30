import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const IsPartOf = ({ linkedProp }) => {
  if (linkedProp && Object.keys(linkedProp).length === 0 && linkedProp.constructor === Object) {
    return <div>parent</div>;
  }
  return (
    <LinkedObjectContainer
      fetch
      forceRender
      object={linkedProp}
      topology={NS.argu('parent')}
    />
  );
};

IsPartOf.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  IsPartOf,
  NS.schema('Thing'),
  [NS.argu('parent'), NS.schema('isPartOf')]
);
