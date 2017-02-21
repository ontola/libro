import React from 'react';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import {
  Card,
  CardContent,
  CardHeader,
  DetailsBar,
  LinkedDetailDate,
} from 'components';

const Motion = () => (
  <Card>
    <CardHeader noSpacing>
      <Property label="schema:name" />
      <DetailsBar>
        <Property label="schema:creator" />
        <LinkedDetailDate />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>
      <Property label="schema:text" />
    </CardContent>
    <Property forceRender label="argu:currentVote" />
  </Card>
);

const MotionCollection = () => (
  <Card>
    <CardHeader noSpacing>
      <Property label="schema:name" />
      <DetailsBar>
        <Property label="schema:creator" />
        <LinkedDetailDate />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>
      <Property label="schema:text" />
      <Property label="argu:arguments" />
    </CardContent>
    <Property forceRender label="argu:currentVote" />
  </Card>
);

LinkedRenderStore.registerRenderer(Motion, 'argu:Motion');
LinkedRenderStore.registerRenderer(
  MotionCollection,
  'argu:Motion',
  RENDER_CLASS_NAME,
  'collection'
);

import './properties/votebuttons';
