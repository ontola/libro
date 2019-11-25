import { Property, TopologyProvider } from 'link-redux';
import React from 'react';

import VoteData from '../../components/VoteData';
import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';

/**
 * @deprecated
 */
export const voteEventResultTopology = NS.argu('voteEventResultTopology');

export class VoteEventResult extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = voteEventResultTopology;
    this.card = false;
  }

  render() {
    if (this.props.totalItems.value === '0') {
      return null;
    }

    return this.wrap((
      <VoteData card={this.card}>
        <Property
          label={ontola.filteredCollections}
          totalVotes={this.props.totalItems}
          variant={this.props.variant}
        />
      </VoteData>
    ));
  }
}
