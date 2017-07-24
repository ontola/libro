import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Motions = ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} />;

Motions.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Motions,
  'http://schema.org/CreativeWork',
  ['argu:motions']
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} topology="argu:section" />,
  'http://schema.org/CreativeWork',
  ['argu:motions'],
  'argu:collection'
);

export default Motions;
