import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  register,
  useLinkRenderContext,
} from 'link-redux';
import React from 'react';

import CollapseText from '../../../components/CollapseText';
import Markdown from '../../../components/Markdown';
import { useStrippedMarkdown } from '../../../helpers/useStrippedMarkdown';
import { cardTopology } from '../../../topologies/Card';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { cardMicroRowTopology } from '../../../topologies/Card/CardMicroRow';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { gridTopology } from '../../../topologies/Grid';
import { listTopology } from '../../../topologies/List';

const textProperties = [
  schema.text,
  schema.description,
];

const Text = ({ linkedProp }: PropertyProps): JSX.Element => (
  <Markdown
    data-test="Thing-text"
    text={linkedProp.value}
  />
);

Text.type = schema.Thing;

Text.property = textProperties;

Text.topology = [
  fullResourceTopology,
  cardMainTopology,
  gridTopology,
];

const TextStripped = ({ linkedProp }: PropertyProps): JSX.Element => (
  <span>
    {useStrippedMarkdown(linkedProp.value)}
  </span>
);

TextStripped.type = schema.Thing;

TextStripped.property = textProperties;

TextStripped.topology = listTopology;

interface TextCollapsedProps extends PropertyProps {
  minCharacters: number;
  noSpacing: boolean;
}

const TextCollapsed = ({
  linkedProp,
  minCharacters,
  noSpacing,
}: TextCollapsedProps): JSX.Element => {
  const { subject } = useLinkRenderContext();

  return (
    <CollapseText
      data-test="Thing-text-card"
      id={subject.value}
      minCharacters={minCharacters}
      noSpacing={noSpacing}
      text={linkedProp.value}
    />
  );
};

TextCollapsed.type = schema.Thing;

TextCollapsed.property = textProperties;

TextCollapsed.topology = [
  cardMicroRowTopology,
  cardRowTopology,
  cardTopology,
  containerTopology,
];

export default [
  register(Text),
  register(TextCollapsed),
  register(TextStripped),
];
