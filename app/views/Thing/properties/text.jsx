import { getP } from 'link-lib';
import React, { PropTypes } from 'react';

import { CollapseText, Markdown } from 'components';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.string,
};

const Text = ({ linkedProp }) => <Markdown text={linkedProp} />;

Text.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Text,
  'http://schema.org/Thing',
  'http://schema.org/text'
);

const contextTypesCollection = {
  schemaObject: PropTypes.object,
};
const propTypesCollection = {
  linkedProp: PropTypes.string,
};

const TextCollection = ({ linkedProp }, { schemaObject }) => <CollapseText id={getP(schemaObject, '@id')} text={linkedProp} />;

TextCollection.propTypes = propTypesCollection;
TextCollection.contextTypes = contextTypesCollection;

LinkedRenderStore.registerRenderer(
  TextCollection,
  'http://schema.org/Thing',
  'http://schema.org/text',
  'collection'
);

export default Text;
