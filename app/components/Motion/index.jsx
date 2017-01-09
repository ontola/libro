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
        <LinkedDetailDate />
        <Property label="schema:creator" />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>
      <Property label="schema:text" />
    </CardContent>
  </Card>
);

LinkedRenderStore.registerRenderer(Motion, 'argu:Motion');
LinkedRenderStore.registerRenderer(
  Motion,
  'argu:Motion',
  RENDER_CLASS_NAME,
  'collection'
);
