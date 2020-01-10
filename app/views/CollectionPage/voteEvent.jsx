/* eslint-disable max-classes-per-file */

import as from '@ontologies/as';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  TopologyProvider,
  link,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { cardVoteEventTopology } from '../../topologies/CardVoteEvent';
import { voteEventTopology } from '../../topologies/VoteEvent';
import { VoteEventResult, voteEventResultTopology } from '../../topologies/VoteEventResult';
import { voteEventSideTopology } from '../../topologies/VoteEventSide';

import { CollectionViewTypes } from './types';

const HUNDRED_PERCENT = 100;
const LOWER_LIMIT = 5;
const THREE_SIDE_STALEMATE = 33;

class VoteEventResultCard extends VoteEventResult {
  constructor() {
    super();

    this.card = true;
  }
}

class VoteEventSide extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = voteEventSideTopology;
  }

  percentages() {
    const sideCount = Number.parseInt(this.props.totalCount.value, 10);
    const voteEventCountRaw = this
      .props
      .lrs
      .getResourceProperty(
        this.props.isViewOf,
        as.totalItems
      ).value;
    const voteEventCount = Number.parseInt(voteEventCountRaw, 10);

    if (voteEventCount === 0) {
      return [0, THREE_SIDE_STALEMATE];
    }

    const votePercentage = (sideCount / voteEventCount) * HUNDRED_PERCENT;
    const displayPercentage = votePercentage < LOWER_LIMIT ? LOWER_LIMIT : votePercentage;

    return [votePercentage, displayPercentage];
  }

  render() {
    const part = new URL(this.props.subject.value).searchParams.get('filter[option]');


    const [votePercentage, displayPercentage] = this.percentages();

    return this.wrap((
      <div
        className={`VoteData__votebar-part VoteData__votebar-part--${part}`}
        style={{ width: `${displayPercentage}%` }}
        title={`${this.props.totalCount.value} (${Math.round(votePercentage)}%)`}
      />
    ));
  }
}

export default [
  LinkedRenderStore.registerRenderer(
    link({
      totalItems: as.totalItems,
    })(VoteEventResult),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    voteEventTopology
  ),
  LinkedRenderStore.registerRenderer(
    link({
      totalItems: as.totalItems,
    })(VoteEventResultCard),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    cardVoteEventTopology
  ),
  LinkedRenderStore.registerRenderer(
    link({
      parentView: NS.argu('parentView'),
      partOf: as.partOf,
      totalItems: as.totalItems,
    })(VoteEventSide),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    voteEventResultTopology
  ),
  LinkedRenderStore.registerRenderer(
    () => <Property label={as.items} />,
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    voteEventSideTopology
  ),
];
