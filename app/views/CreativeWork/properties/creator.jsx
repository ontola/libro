import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

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

export default LinkedRenderStore.registerRenderer(
  Creator,
  NS.schema('CreativeWork'),
  NS.schema('creator')
);
