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

const Comment = () => (
  <Card>
    <CardHeader noSpacing>
      <DetailsBar>
        <LinkedDetailDate />
        <Property label="schema:creator" />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>
      <Property label="schema:text" />
    </CardContent>
  </Card>
);

LinkedRenderStore.registerRenderer(Comment, 'http://schema.org/Comment');
LinkedRenderStore.registerRenderer(
  Comment,
  ['http://schema.org/Comment', 'https://argu.co/ns/core#Comment'],
  RENDER_CLASS_NAME,
  'argu:collection'
);

export default Comment;
