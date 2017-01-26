import React, { PropTypes } from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

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
      topology="detail"
    />
  );
};

Creator.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Creator,
  'http://schema.org/CreativeWork',
  'http://schema.org/creator'
);

export default Creator;
