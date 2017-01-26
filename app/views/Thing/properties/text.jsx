import Markdown from 'react-remarkable';
import React, { PropTypes } from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.string,
};

const Text = ({ linkedProp }) => <Markdown source={linkedProp} />;

Text.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Text,
  'http://schema.org/Thing',
  'http://schema.org/text'
);

export default Text;
