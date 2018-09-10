import { Property, TopologyProvider } from 'link-redux';
import React from 'react';

import VoteData from '../../components/VoteData';
import { NS } from '../../helpers/LinkedRenderStore';

/**
 * @deprecated
 */
export const voteEventResult = NS.argu('voteEventResult');

export class VoteEventResult extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = voteEventResult;
    this.card = false;
  }

  render() {
    if (this.props.totalItems.value === '0') {
      return null;
    }

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
