import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link,
  TopologyProvider, linkedPropType, subjectType,
} from 'link-redux';
import React from 'react';

import VoteData from '../../components/VoteData';
import { NS } from '../../helpers/LinkedRenderStore';

import { CollectionTypes } from './types';

const HUNDRED_PERCENT = 100;
const LOWER_LIMIT = 5;
const THREE_SIDE_STALEMATE = 33;

class VoteEventResult extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = NS.argu('voteEventResult');
    this.card = false;
  }

  render() {
    return this.wrap((
      <VoteData card={this.card}>
        <Property
          label={NS.argu('filteredCollections')}
          totalVotes={this.props.totalItems}
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
  totalItems: linkedPropType,
  totalVotes: linkedPropType,
};

export default [
  LinkedRenderStore.registerRenderer(
    link([NS.as('totalItems')])(VoteEventResult),
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('voteEvent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.as('totalItems')])(VoteEventResultCard),
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('cardVoteEvent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.argu('parentView'), NS.as('totalItems')])(VoteEventSide),
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('voteEventResult')
  ),
  LinkedRenderStore.registerRenderer(
    () => <Property label={NS.as('items')} />,
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('voteEventSide')
  ),
];
