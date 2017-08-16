import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS, linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Arguments = ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} />;

Arguments.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Arguments,
  NS.schema('CreativeWork'),
  NS.argu('arguments')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} topology={NS.argu('section')} />,
  NS.schema('CreativeWork'),
  NS.argu('arguments'),
  NS.argu('collection')
);

export default Arguments;
