import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
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
