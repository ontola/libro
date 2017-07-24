import React from 'react';
import LinkedRenderStore, { defaultNS, RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  DetailsBar,
  HoverBox,
  LinkCard,
  LinkedDetailDate,
} from 'components';

import './properties/voteEvents';

const CreativeWork = () => (
  <Card>
    <CardHeader noSpacing>
      <Property label={defaultNS.schema('name')} />
      <DetailsBar>
        <Property label={defaultNS.schema('creator')} />
        <LinkedDetailDate />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>
      <Property label={defaultNS.schema('text')} />
    </CardContent>
    <CardActions>
      <Property label={defaultNS.schema('updateAction')} />
    </CardActions>
  </Card>
);

const HiddenChildren = () => (
  <Property label="schema:text" />
);

const CreativeWorkSection = () => (
  <HoverBox hiddenChildren={<HiddenChildren />}>
    <Property label={defaultNS.schema('name')} topology="argu:inline" />
  </HoverBox>
);

LinkedRenderStore.registerRenderer(CreativeWork, 'http://schema.org/CreativeWork');
LinkedRenderStore.registerRenderer(
  CreativeWork,
  'http://schema.org/CreativeWork',
  RENDER_CLASS_NAME,
  'argu:collection'
);
LinkedRenderStore.registerRenderer(
  CreativeWorkSection,
  'http://schema.org/CreativeWork',
  RENDER_CLASS_NAME,
  'argu:section'
);

LinkedRenderStore.registerRenderer(
  () => <LinkCard><Property label={defaultNS.schema('name')} /></LinkCard>,
  'http://schema.org/CreativeWork',
  RENDER_CLASS_NAME,
  'argu:parent'
);

export { default as Arguments } from './properties/arguments';
export { default as Creator } from './properties/creator';
export { default as DateCreated } from './properties/dateCreated';
export { default as isPartOf } from './properties/isPartOf';
export { default as Name } from './properties/name';
