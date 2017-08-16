import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Motions = ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} />;

Motions.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Motions,
  NS.schema('CreativeWork'),
  NS.argu('motions')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} topology={NS.argu('section')} />,
  NS.schema('CreativeWork'),
  NS.argu('motions'),
  NS.argu('collection')
);

export default Motions;
