import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link, TopologyProvider, lrsType,
} from 'link-redux';
import React from 'react';

import VoteData from '../../components/VoteData';
import { NS } from '../../helpers/LinkedRenderStore';

import { CollectionTypes } from './types';

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
    return (
      <VoteData card={this.card}>
        <Property
          label={NS.argu('views')}
          totalVotes={this.props.totalCount}
          variant={this.props.variant}
        />
      </VoteData>
    );
  }
}

class VoteEventResultCard extends VoteEventResult {
  constructor() {
    super();

    this.card = true;
  }
}

class VoteEventSide extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('voteEventSide');
  }

  percentages() {
    const sideCount = Number.parseInt(this.props.totalCount.value, 10);
    const voteEventCountRaw = this
      .context
      .linkedRenderStore
      .getResourceProperty(
        this.props.parentView,
        NS.argu('totalCount')
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

    return (
      <div
        className={`VoteData__votebar-part VoteData__votebar-part--${part}`}
        style={{ width: `${displayPercentage}%` }}
        title={`${this.props.totalCount.value} (${Math.round(votePercentage)}%)`}
      />
    );
  }
}

VoteEventSide.contextTypes = {
  linkedRenderStore: lrsType,
};

export default [
  LinkedRenderStore.registerRenderer(
    link([NS.argu('totalCount')])(VoteEventResult),
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('voteEvent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.argu('totalCount')])(VoteEventResultCard),
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('cardVoteEvent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.argu('parentView'), NS.argu('totalCount')])(VoteEventSide),
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('voteEventResult')
  ),
  LinkedRenderStore.registerRenderer(
    () => <Property label={NS.argu('members')} />,
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('voteEventSide')
  ),
];
