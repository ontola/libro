import React from 'react';

import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

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
  NS.schema('CreateAction'),
  NS.schema('name')
);

export default Name;
