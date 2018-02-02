import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Card,
  CardContent,
  DetailsBar,
  LinkedDetailDate,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import './properties/name';
import './properties/motions';

const QuestionCollection = () => (
  <Card>
    <CardContent noSpacing>
      <Property label={NS.schema('name')} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <LinkedDetailDate />
      </DetailsBar>
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
