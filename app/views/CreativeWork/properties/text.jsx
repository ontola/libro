import React, { PropTypes } from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.object,
};

const Text = ({ linkedProp }) => <p>{linkedProp}</p>;

Text.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Text,
  'http://schema.org/CreativeWork',
  'http://schema.org/text'
);

export default Text;
