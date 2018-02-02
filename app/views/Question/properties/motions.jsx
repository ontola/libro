import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Motions = ({ linkedProp }) => <LinkedResourceContainer subject={linkedProp} />;

Motions.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Motions,
  NS.schema('CreativeWork'),
  NS.argu('motions')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <LinkedResourceContainer subject={linkedProp} topology={NS.argu('section')} />,
  NS.schema('CreativeWork'),
  NS.argu('motions'),
  NS.argu('collection')
);

export default Motions;
