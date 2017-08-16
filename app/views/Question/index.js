import React from 'react';
import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import {
  Card,
  CardContent,
  CardHeader,
  DetailsBar,
  LinkedDetailDate,
} from 'components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/name';
import './properties/motions';

const QuestionCollection = () => (
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
      <Property label={NS.argu('motions')} />
    </CardContent>
  </Card>
);

LinkedRenderStore.registerRenderer(
  QuestionCollection,
  NS.argu('Question'),
  RENDER_CLASS_NAME,
  NS.argu('collection')
);
