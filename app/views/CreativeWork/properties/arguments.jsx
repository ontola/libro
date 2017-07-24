import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Arguments = ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} />;

Arguments.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Arguments,
  'http://schema.org/CreativeWork',
  ['argu:arguments']
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} topology="argu:section" />,
  'http://schema.org/CreativeWork',
  ['argu:arguments'],
  'argu:collection'
);

export default Arguments;
