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

import './properties/name';
import './properties/motions';

const QuestionCollection = () => (
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
      <Property label="argu:motions" />
    </CardContent>
  </Card>
);

LinkedRenderStore.registerRenderer(
  QuestionCollection,
  'argu:Question',
  RENDER_CLASS_NAME,
  'collection'
);
