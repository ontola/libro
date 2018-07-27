import { LinkedRenderStore, RENDER_CLASS_NAME } from 'link-lib';
import { link, linkedPropType, Property } from 'link-redux';
import React from 'react';

import {
  ActionsBar,
  Card,
  CardAppendix,
  CardContent,
  DetailsBar,
} from '../../components';
import { connectHighlighting, hightlightType } from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';

import CurrentVote from './properties/currentVote';

const ArgumentContainer = ({ highlighted, votesProCount }) => (
  <Card shine={highlighted}>
    <Property label={NS.argu('coverPhoto')} />
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <Property label={NS.schema('dateCreated')} />
      </DetailsBar>
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
      <ActionsBar>
        <Property count={votesProCount} label={NS.schema('potentialAction')} />
      </ActionsBar>
    </CardContent>
    <CardAppendix>
      <Property label={NS.argu('voteableVoteEvent')} />
      <Property label={NS.schema('comments')} />
      <Property clickToOpen forceRender label={NS.app('omniform')} />
    </CardAppendix>
  </Card>
);

ArgumentContainer.propTypes = {
  highlighted: hightlightType,
  votesProCount: linkedPropType,
};

export default [
  LinkedRenderStore.registerRenderer(
    connectHighlighting(link([
      NS.schema('dateCreated'),
      NS.argu('votesProCount'),
    ])(ArgumentContainer)),
    [NS.argu('Argument'), NS.argu('ConArgument'), NS.argu('ProArgument')],
    RENDER_CLASS_NAME,
    NS.argu('container')
  ),
  CurrentVote,
];
