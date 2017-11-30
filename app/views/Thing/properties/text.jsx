import LinkedRenderStore from 'link-lib';
import { linkedPropType, lowLevel, subjectType } from 'link-redux';
import React from 'react';

import {
  CollapseText,
  Markdown,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Text = ({ linkedProp }) => <Markdown data-test="Thing-text" text={linkedProp} />;

Text.propTypes = propTypes;

const propTypesCollection = {
  linkedProp: linkedPropType,
  subject: subjectType,
};

const TextCollection = ({ linkedProp, subject }) =>
  <CollapseText data-test="Thing-text-collection" id={subject.value} text={linkedProp} />;

TextCollection.propTypes = propTypesCollection;

export default [
  LinkedRenderStore.registerRenderer(
    Text,
    NS.schema('Thing'),
    NS.schema('text')
  ),
  LinkedRenderStore.registerRenderer(
    lowLevel.linkedSubject(TextCollection),
    NS.schema('Thing'),
    NS.schema('text'),
    NS.argu('collection')
  ),
];
