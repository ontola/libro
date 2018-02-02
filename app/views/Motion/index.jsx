import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Card,
  CardContent,
  DetailsBar,
  LinkedDetailDate,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import './properties/votebuttons';

const propTypes = {
  onVoteCompleted: PropTypes.func,
};

const Motion = ({ onVoteCompleted }) => (
  <Card>
    <CardContent>
      <Property label={NS.schema('name')} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <LinkedDetailDate />
      </DetailsBar>
      <Property label={NS.schema('text')} />
    </CardContent>
    <Property forceRender label={NS.argu('currentVote')} onVoteCompleted={onVoteCompleted} />
  </Card>
);

Motion.propTypes = propTypes;

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
