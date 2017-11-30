import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  DetailsBar,
  HoverBox,
  LinkedDetailDate,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import Arguments from './properties/arguments';
import Creator from './properties/creator';
import Name from './properties/name';
import VoteEvents from './properties/voteEvents';

const CreativeWork = () => (
  <Card>
    <CardContent noSpacing>
      <Property label={NS.schema('name')} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <LinkedDetailDate />
      </DetailsBar>
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

export default [
  LinkedRenderStore.registerRenderer(CreativeWork, NS.schema('CreativeWork')),
  LinkedRenderStore.registerRenderer(
    CreativeWork,
    NS.schema('CreativeWork'),
    RENDER_CLASS_NAME,
    NS.argu('collection')
  ),
  LinkedRenderStore.registerRenderer(
    CreativeWorkSection,
    NS.schema('CreativeWork'),
    RENDER_CLASS_NAME,
    NS.argu('section')
  ),
  ...Arguments,
  Creator,
  ...Name,
  VoteEvents,
];
