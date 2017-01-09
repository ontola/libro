import React, { Component, PropTypes } from 'react';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import '../VoteData/VoteData.scss';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Detail,
  DetailDate,
  DetailStatus,
  DetailsBar,
  LDLink,
  LinkedDetailDate,
} from 'components';
import { calcPercentage } from 'helpers/numbers';

class VoteEvent extends Component {
  render() {
    // const {
    //   legislativeSession,
    // } = this.props;
    // const orderedKeys = ['yes', 'abstain', 'no'];
    // const totalVotes = orderedKeys
    //   .map(opt => optionCounts[opt])
    //   .reduce((v, i) => v + i);
    // // Only show the item if there are votes
    // if (!(totalVotes >= 1)) {
    //   return false;
    // }
    return (
      <div className="VoteData">
        <Property label="schema:result" />
        <LinkedDetailDate />
        <Property label="argu:votes" />
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(VoteEvent, 'argu:VoteEvent');
LinkedRenderStore.registerRenderer(
  VoteEvent,
  'argu:VoteEvent',
  RENDER_CLASS_NAME,
  'collection'
);

import './properties/votes';
