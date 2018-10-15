import { LinkedRenderStore, RENDER_CLASS_NAME } from 'link-lib';
import { link, linkType, Property } from 'link-redux';
import React from 'react';

import {
  CardContent,
} from '../../components';
import { connectHighlighting, hightlightType } from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';

import CurrentVote from './properties/currentVote';

const ArgumentContainer = ({ highlighted, votesProCount }) => (
  <Card shine={highlighted}>
    <Property label={NS.argu('coverPhoto')} />
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
    </CardContent>
    <ActionsBar>
      <Property count={votesProCount} label={NS.schema('potentialAction')} />
    </ActionsBar>
    <CardAppendix>
      <Property label={NS.argu('voteableVoteEvent')} />
      <Property label={NS.argu('topComment')} />
      <Property clickToOpen forceRender label={NS.app('omniform')} />
    </CardAppendix>
  </Card>
);

ArgumentContainer.propTypes = {
  highlighted: hightlightType,
  votesProCount: linkType,
};

export default [
  LinkedRenderStore.registerRenderer(
    connectHighlighting(link([
      NS.schema('dateCreated'),
      NS.argu('votesProCount'),
    ])(ArgumentContainer)),
    [NS.argu('Argument'), NS.argu('ConArgument'), NS.argu('ProArgument')],
    RENDER_CLASS_NAME,
    containerTopology
  ),
  CurrentVote,
];
