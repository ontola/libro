import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Name = ({ linkedProp }) => (
  <span>
    {linkedProp}
  </span>
);

Name.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Name,
  'http://schema.org/CreateAction',
  'http://schema.org/name'
);

export default Name;
