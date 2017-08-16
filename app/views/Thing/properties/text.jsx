import { anyObjectValue } from 'link-lib';
import React, { PropTypes } from 'react';

import { CollapseText, Markdown } from 'components';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.string,
};

const Text = ({ linkedProp }) => <Markdown text={linkedProp} />;

Text.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Text,
  NS.schema('Thing'),
  NS.schema('text')
);

const contextTypesCollection = {
  schemaObject: PropTypes.object,
};
const propTypesCollection = {
  linkedProp: PropTypes.string,
};

const TextCollection = ({ linkedProp }, { schemaObject }) =>
  <CollapseText id={anyObjectValue(schemaObject, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#subject')} text={linkedProp} />;

TextCollection.propTypes = propTypesCollection;
TextCollection.contextTypes = contextTypesCollection;

LinkedRenderStore.registerRenderer(
  TextCollection,
  NS.schema('Thing'),
  NS.schema('text'),
  NS.argu('collection')
);

export default Text;
