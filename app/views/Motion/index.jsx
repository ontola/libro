import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Card,
  CardContent,
  Container,
  DetailsBar,
  LinkedDetailDate,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import './properties/votebuttons';

const Motion = () => (
  <div>
    <Property label={NS.argu('coverPhoto')} />
    <Container>
      <Card>
        <CardContent>
          <Property label={NS.schema('name')} />
          <DetailsBar>
            <Property label={NS.schema('creator')} />
            <Property label={NS.schema('dateCreated')} />
          </DetailsBar>
          <Property label={NS.schema('text')} />
        </CardContent>
      </Card>
    </Container>
    <Container size="large">
      <Property
        forceRender
        label={[
          NS.argu('arguments'),
          NS.schema('comments')
        ]}
      />
    </Container>
  </div>
);

const MotionCollection = () => (
  <Card>
    <CardContent>
      <Property label={NS.schema('name')} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <LinkedDetailDate />
      </DetailsBar>
      <Property label={NS.schema('text')} />
      <Property label={NS.argu('arguments')} />
    </CardContent>
    <Property forceRender label={NS.argu('currentVote')} />
  </Card>
);

LinkedRenderStore.registerRenderer(Motion, NS.argu('Motion'));
LinkedRenderStore.registerRenderer(
  MotionCollection,
  NS.argu('Motion'),
  RENDER_CLASS_NAME,
  NS.argu('collection')
);
