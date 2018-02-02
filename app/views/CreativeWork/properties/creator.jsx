import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
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
    <LinkedResourceContainer
      subject={linkedProp}
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
