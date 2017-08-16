import { lowLevel } from 'link-redux';
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

const propTypesCollection = {
  linkedProp: PropTypes.string,
  subject: PropTypes.object,
};

const TextCollection = ({ linkedProp, subject }) =>
  <CollapseText id={subject} text={linkedProp} />;

TextCollection.propTypes = propTypesCollection;

LinkedRenderStore.registerRenderer(
  lowLevel.linkedSubject(TextCollection),
  NS.schema('Thing'),
  NS.schema('text'),
  NS.argu('collection')
);

export default Text;
