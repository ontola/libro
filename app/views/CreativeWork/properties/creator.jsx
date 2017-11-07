import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => {
  if (typeof linkedProp === 'undefined') {
    return <span />;
  }
  return (
    <LinkedObjectContainer
      object={linkedProp}
      topology={NS.argu('detail')}
    />
  );
};

Creator.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Creator,
  NS.schema('CreativeWork'),
  NS.schema('creator')
);

export default Creator;
