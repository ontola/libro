import { linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Name = ({ linkedProp }) => (
  <span>{linkedProp.value}</span>
);

Name.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Name,
  NS.schema('EntryPoint'),
  NS.schema('name')
);

LinkedRenderStore.registerRenderer(
  Name,
  NS.schema('EntryPoint'),
  NS.schema('name'),
  NS.argu('collection')
);

export default Name;
