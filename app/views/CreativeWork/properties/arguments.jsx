import React, { PropTypes } from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.object,
};

const Arguments = ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} />;

Arguments.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Arguments,
  'http://schema.org/CreativeWork',
  ['http://schema.org/arguments', 'argu:arguments']
);

export default Arguments;
