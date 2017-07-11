import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  DetailsBar,
  LinkedDetailDate,
} from 'components';

import './page';
import './properties/votebuttons';

const propTypes = {
  onVoteCompleted: PropTypes.func,
};

const Motion = ({ onVoteCompleted }) => (
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
    <Property forceRender label="argu:currentVote" onVoteCompleted={onVoteCompleted} />
  </Card>
);

Motion.propTypes = propTypes;

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
