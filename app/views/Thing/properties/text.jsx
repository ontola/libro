import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  subjectType,
  withLinkCtx,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CollapseText from '../../../components/CollapseText';
import Markdown from '../../../components/Markdown';
import { useStrippedMarkdown } from '../../../helpers/markdownHelper';
import { cardTopology } from '../../../topologies/Card';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { cardMicroRowTopology } from '../../../topologies/Card/CardMicroRow';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { gridTopology } from '../../../topologies/Grid';

const propTypes = {
  linkedProp: linkedPropType,
};

const Text = ({ linkedProp }) => <Markdown data-test="Thing-text" text={linkedProp.value} />;

Text.propTypes = propTypes;

const propTypesCollection = {
  linkedProp: linkedPropType,
  minCharacters: PropTypes.number,
  noSpacing: PropTypes.bool,
  subject: subjectType,
};

const TextStripped = ({ linkedProp }) => (
  <span>{useStrippedMarkdown(linkedProp.value)}</span>
);

TextStripped.propTypes = propTypes;

const TextCollapsed = ({
  linkedProp,
  minCharacters,
  noSpacing,
  subject,
}) => (
  <CollapseText
    data-test="Thing-text-card"
    id={subject.value}
    minCharacters={minCharacters}
    noSpacing={noSpacing}
    text={linkedProp.value}
  />
);

TextCollapsed.propTypes = propTypesCollection;

export default [
  LinkedRenderStore.registerRenderer(
    Text,
    schema.Thing,
    [schema.text, schema.description],
    [
      fullResourceTopology,
      cardMainTopology,
      gridTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    withLinkCtx(TextCollapsed),
    schema.Thing,
    [schema.text, schema.description],
    [
      cardMicroRowTopology,
      cardRowTopology,
      cardTopology,
      containerTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    TextStripped,
    schema.Thing,
    [schema.text, schema.description],
    cardListTopology
  ),
];
