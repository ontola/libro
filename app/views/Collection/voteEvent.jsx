import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link,
  linkType,
  subjectType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { cardVoteEventTopology } from '../../topologies/CardVoteEvent';
import { voteEventTopology } from '../../topologies/VoteEvent';
import { VoteEventResult, voteEventResultTopology } from '../../topologies/VoteEventResult/index';
import { voteEventSideTopology } from '../../topologies/VoteEventSide';

import { CollectionTypes } from './types';

const HUNDRED_PERCENT = 100;
const LOWER_LIMIT = 5;
const THREE_SIDE_STALEMATE = 33;

export class VoteEventResultCard extends VoteEventResult {
  constructor() {
    super();

    this.card = true;
  }
}

class VoteEventSide extends React.PureComponent {
  percentages() {
    const sideCount = Number.parseInt(this.props.totalItems.value, 10);
    const voteEventCountRaw = this.props.totalVotes.value;
    const voteEventCount = Number.parseInt(voteEventCountRaw, 10);

    if (voteEventCount === 0) {
      return [0, THREE_SIDE_STALEMATE];
    }

    const votePercentage = (sideCount / voteEventCount) * HUNDRED_PERCENT;
    const displayPercentage = votePercentage < LOWER_LIMIT ? LOWER_LIMIT : votePercentage;

    return [votePercentage, displayPercentage];
  }

  render() {
    const filters = new URL(this.props.subject.value).searchParams.get('filter[]');
    const option = new URLSearchParams(decodeURIComponent(filters)).get('option');

    const [votePercentage, displayPercentage] = this.percentages();

    return (
      <div
        className={`VoteData__votebar-part VoteData__votebar-part--${option}`}
        style={{ width: `${displayPercentage}%` }}
        title={`${this.props.totalItems.value} (${Math.round(votePercentage)}%)`}
      />
    );
  }
}

VoteEventSide.propTypes = {
  subject: subjectType,
  totalItems: linkType,
  totalVotes: linkType,
};

const totalItemsProp = {
  totalItems: NS.as('totalItems'),
};

export default [
  LinkedRenderStore.registerRenderer(
    link(totalItemsProp)(VoteEventResult),
    CollectionTypes,
    RENDER_CLASS_NAME,
    voteEventTopology
  ),
  LinkedRenderStore.registerRenderer(
    link(totalItemsProp)(VoteEventResultCard),
    CollectionTypes,
    RENDER_CLASS_NAME,
    cardVoteEventTopology
  ),
  LinkedRenderStore.registerRenderer(
    link({
      parentView: NS.argu('parentView'),
      ...totalItemsProp,
    })(VoteEventSide),
    CollectionTypes,
    RENDER_CLASS_NAME,
    voteEventResultTopology
  ),
  LinkedRenderStore.registerRenderer(
    () => <Property label={NS.as('items')} />,
    CollectionTypes,
    RENDER_CLASS_NAME,
    voteEventSideTopology
  ),
];
