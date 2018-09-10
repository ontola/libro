import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, withLinkCtx } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import CardVoteEvent from '../../topologies/CardVoteEvent';
import VoteEvent from '../../topologies/VoteEvent';

import CurrentVote from './properties/currentVote';

class VoteEventCard extends CardVoteEvent {
  render() {
    return this.wrap((
      <div itemScope>
        <Property forceRender label={NS.argu('currentVote')} />
        <Property label={NS.schema('result')} />
        <Property label={NS.argu('votes')} />
      </div>
    ));
  }
}

class VoteEventContainer extends VoteEvent {
  render() {
    return this.wrap((
      <React.Fragment key="VoteEventContainer">
        <Property forceRender label={NS.argu('currentVote')} />
        <Property label={NS.schema('result')} />
        <Property label={NS.argu('votes')} />
      </React.Fragment>
    ));
  }
}

export default [
  LinkedRenderStore.registerRenderer(
    withLinkCtx(VoteEventContainer),
    [NS.argu('VoteEvent'), NS.aod('VoteEvent')],
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('collection'),
      NS.argu('card'),
      NS.argu('cardAppendix'),
      NS.argu('container'),
      NS.argu('voteEvent'),
      NS.argu('voteEventCollection'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    withLinkCtx(VoteEventCard),
    NS.argu('VoteEvent'),
    RENDER_CLASS_NAME,
    NS.argu('cardMain')
  ),
  CurrentVote,
];
