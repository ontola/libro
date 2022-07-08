import * as schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import { useHighlight } from '../../components/HighlightProvider/HighlightProvider';
import CardContent from '../../components/Card/CardContent';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import HoverBox from '../../topologies/HoverBox';
import { listTopology } from '../../topologies/List';

const ThingHoverBoxHidden = (): JSX.Element => (
  <Property label={schema.text} />
);

const ThingSection = ({ subject }: SubjectProp): JSX.Element => {
  const { highlightState } = useHighlight();

  return (
    <HoverBox
      hiddenChildren={<ThingHoverBoxHidden />}
      shine={subject.value === highlightState}
    >
      <Property label={schema.name} />
    </HoverBox>
  );
};

export default [
  ...LinkedRenderStore.registerRenderer(
    ThingSection,
    schema.Thing,
    RENDER_CLASS_NAME,
    listTopology,
  ),
  ...LinkedRenderStore.registerRenderer(
    (props: SubjectProp): JSX.Element => (
      <CardContent>
        <ThingSection {...props} />
      </CardContent>
    ),
    schema.Thing,
    RENDER_CLASS_NAME,
    cardRowTopology,
  ),
];
