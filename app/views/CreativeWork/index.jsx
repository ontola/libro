import React from 'react';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  DetailsBar,
  LinkCard,
  LinkedDetailDate,
} from 'components';

const CreativeWork = () => (
  <Card>
    <CardHeader noSpacing>
      <Property label="schema:name" />
      <DetailsBar>
        <LinkedDetailDate />
        <Property label="schema:creator" />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>
      <Property label="schema:text" />
    </CardContent>
    <CardActions>
      <Property label="schema:updateAction" />
    </CardActions>
  </Card>
);

LinkedRenderStore.registerRenderer(CreativeWork, 'http://schema.org/CreativeWork');
LinkedRenderStore.registerRenderer(
  CreativeWork,
  'http://schema.org/CreativeWork',
  RENDER_CLASS_NAME,
  'collection'
);

LinkedRenderStore.registerRenderer(
  () => <LinkCard><Property label="schema:name" /></LinkCard>,
  'http://schema.org/CreativeWork',
  RENDER_CLASS_NAME,
  'parent'
);

export { default as Arguments } from './properties/arguments';
export { default as Creator } from './properties/creator';
export { default as DateCreated } from './properties/dateCreated';
export { default as isPartOf } from './properties/isPartOf';
export { default as Name } from './properties/name';
import './properties/voteEvents';
