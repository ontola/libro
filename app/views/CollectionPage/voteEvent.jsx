import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link, TopologyProvider,
} from 'link-redux';
import React from 'react';

import VoteData from '../../components/VoteData';
import { NS } from '../../helpers/LinkedRenderStore';

import { CollectionViewTypes } from './types';

const HUNDRED_PERCENT = 100;
const LOWER_LIMIT = 5;
const THREE_SIDE_STALEMATE = 33;

class VoteEventResult extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('voteEventResult');
    this.card = false;
  }

  render() {
    return this.wrap((
      <VoteData card={this.card}>
        <Property
          label={NS.as('pages')}
          limit={Infinity}
          totalVotes={this.props.totalCount}
          variant={this.props.variant}
        />
      </VoteData>
    ));
  }
}

class VoteEventResultCard extends VoteEventResult {
  constructor() {
    super();

    this.card = true;
  }
}

class VoteEventSide extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = NS.argu('voteEventSide');
  }

  percentages() {
    const sideCount = Number.parseInt(this.props.totalCount.value, 10);
    const voteEventCountRaw = this
      .context
      .lrs
      .getResourceProperty(
        this.props.isViewOf,
        NS.as('totalItems')
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
    link([NS.as('totalItems')])(VoteEventResult),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    NS.argu('voteEvent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.as('totalItems')])(VoteEventResultCard),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    NS.argu('cardVoteEvent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.argu('parentView'), NS.as('partOf'), NS.as('totalItems')])(VoteEventSide),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    NS.argu('voteEventResult')
  ),
  LinkedRenderStore.registerRenderer(
    () => <Property label={NS.as('items')} />,
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    NS.argu('voteEventSide')
  ),
];
