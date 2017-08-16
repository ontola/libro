import React, { PropTypes } from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
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
