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
  ['http://schema.org/arguments', 'argu:arguments']
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} topology="section" />,
  'http://schema.org/CreativeWork',
  ['http://schema.org/arguments', 'argu:arguments'],
  'collection'
);

export default Arguments;
