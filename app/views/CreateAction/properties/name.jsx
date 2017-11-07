import { linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
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
