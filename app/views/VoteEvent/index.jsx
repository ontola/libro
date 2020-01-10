/* eslint-disable max-classes-per-file */

import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, withLinkCtx } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { cardTopology } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import CardVoteEvent from '../../topologies/CardVoteEvent';
import { containerTopology } from '../../topologies/Container';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import VoteEvent, { voteEventTopology } from '../../topologies/VoteEvent';

import CurrentVote from './properties/currentVote';

class VoteEventCard extends CardVoteEvent {
  render() {
    return this.wrap((
      <div itemScope>
        <Property forceRender label={NS.argu('currentVote')} />
        <Property label={schema.result} />
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
        <Property label={schema.result} />
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
      cardAppendixTopology,
      cardTopology,
      containerTopology,
      primaryResourceTopology,
      voteEventTopology,
      NS.argu('voteEventCollection'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    withLinkCtx(VoteEventCard),
    NS.argu('VoteEvent'),
    RENDER_CLASS_NAME,
    cardMainTopology
  ),
  CurrentVote,
];
