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

const Text = ({ linkedProp }) => <Markdown data-test="Thing-text" text={linkedProp.value} />;

Text.propTypes = propTypes;

const propTypesCollection = {
  linkedProp: linkedPropType,
  subject: subjectType,
};

const TextCollapsed = ({ linkedProp, subject }) =>
  <CollapseText data-test="Thing-text-card" id={subject.value} text={linkedProp.value} />;

TextCollapsed.propTypes = propTypesCollection;

export default [
  LinkedRenderStore.registerRenderer(
    Text,
    NS.schema('Thing'),
    NS.schema('text')
  ),
  LinkedRenderStore.registerRenderer(
    lowLevel.linkedSubject(TextCollapsed),
    NS.schema('Thing'),
    NS.schema('text'),
    [
      NS.argu('card'),
      NS.argu('cardMain'),
      NS.argu('collection'),
      NS.argu('container'),
    ]
  ),
];
