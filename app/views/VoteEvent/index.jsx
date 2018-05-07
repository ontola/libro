import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { lowLevel, Property, TopologyProvider } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import CurrentVote from './properties/currentVote';

class VoteEventCard extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('cardVoteEvent');
  }

  render() {
    return (
      <div itemScope>
        <Property forceRender label={NS.argu('currentVote')} />
        <Property label={NS.schema('result')} />
        <Property label={NS.argu('votes')} />
      </div>
    );
  }
}

class VoteEventContainer extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('voteEvent');
  }

  render() {
    return (
      <div itemScope>
        <Property forceRender label={NS.argu('currentVote')} />
        <Property label={NS.schema('result')} />
        <Property label={NS.argu('votes')} />
      </div>
    );
  }
}

export default [
  LinkedRenderStore.registerRenderer(
    lowLevel.linkedSubject(lowLevel.linkedVersion(VoteEventContainer)),
    [NS.argu('VoteEvent'), NS.aod('VoteEvent')],
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('collection'),
      NS.argu('cardAppendix'),
      NS.argu('container'),
      NS.argu('voteEvent'),
      NS.argu('voteEventCollection'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    lowLevel.linkedSubject(lowLevel.linkedVersion(VoteEventCard)),
    NS.argu('VoteEvent'),
    RENDER_CLASS_NAME,
    NS.argu('cardMain')
  ),
  CurrentVote
];

