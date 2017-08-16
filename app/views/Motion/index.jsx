import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  DetailsBar,
  LinkedDetailDate,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/votebuttons';

const propTypes = {
  onVoteCompleted: PropTypes.func,
};

const Motion = ({ onVoteCompleted }) => (
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
    <Property forceRender label={NS.argu('currentVote')} onVoteCompleted={onVoteCompleted} />
  </Card>
);

Motion.propTypes = propTypes;

const MotionCollection = () => (
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
