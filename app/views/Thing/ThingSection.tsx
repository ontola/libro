import * as schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { connectHighlighting } from '../../containers/Highlight';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import HoverBox from '../../topologies/HoverBox';

interface ThingSectionProps {
  highlighted: boolean;
}

const ThingHoverBoxHidden = (): JSX.Element => (
  <Property label={schema.text} />
);

const ThingSection = ({ highlighted }: ThingSectionProps): JSX.Element => (
  <HoverBox
    hiddenChildren={<ThingHoverBoxHidden />}
    shine={highlighted}
  >
    <Property label={schema.name} />
  </HoverBox>
);

export default [
  LinkedRenderStore.registerRenderer(
    connectHighlighting(ThingSection),
    schema.Thing,
    RENDER_CLASS_NAME,
    cardListTopology,
  ),
  LinkedRenderStore.registerRenderer(
    connectHighlighting((props): JSX.Element => (
      <CardContent>
        <ThingSection {...props} />
      </CardContent>
    )),
    schema.Thing,
    RENDER_CLASS_NAME,
    cardRowTopology,
  ),
];
