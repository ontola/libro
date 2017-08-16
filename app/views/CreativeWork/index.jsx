import React from 'react';
import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  DetailsBar,
  HoverBox,
  LinkedDetailDate,
} from 'components';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/voteEvents';

const CreativeWork = () => (
  <Card>
    <CardHeader noSpacing>
      <Property label={NS.schema('name')} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <LinkedDetailDate />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>
      <Property label={NS.schema('text')} />
    </CardContent>
    <CardActions>
      <Property label={NS.schema('updateAction')} />
    </CardActions>
  </Card>
);

const HiddenChildren = () => (
  <Property label={NS.schema('text')} />
);

const CreativeWorkSection = () => (
  <HoverBox hiddenChildren={<HiddenChildren />}>
    <Property label={NS.schema('name')} topology={NS.argu('inline')} />
  </HoverBox>
);

LinkedRenderStore.registerRenderer(CreativeWork, NS.schema('CreativeWork'));
LinkedRenderStore.registerRenderer(
  CreativeWork,
  NS.schema('CreativeWork'),
  RENDER_CLASS_NAME,
  NS.argu('collection')
);
LinkedRenderStore.registerRenderer(
  CreativeWorkSection,
  NS.schema('CreativeWork'),
  RENDER_CLASS_NAME,
  NS.argu('section')
);

export { default as Arguments } from './properties/arguments';
export { default as Creator } from './properties/creator';
export { default as DateCreated } from './properties/dateCreated';
export { default as isPartOf } from './properties/isPartOf';
export { default as Name } from './properties/name';
