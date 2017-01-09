import React from 'react';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  DetailsBar,
  LinkedDetailDate,
} from 'components';

const Vote = () => (
  <Property label="schema:name" />
);

// LinkedRenderStore.registerRenderer(Vote, 'argu:Vote');
// LinkedRenderStore.registerRenderer(
//   Vote,
//   'argu:Vote',
//   RENDER_CLASS_NAME,
//   'collection'
// );
