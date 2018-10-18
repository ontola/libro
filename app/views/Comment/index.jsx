import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  CardContent,
} from '../../components';
import { connectHighlighting, hightlightPropTypes } from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix, { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardListTopology } from '../../topologies/Card/CardList';
import CardMicroRow from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';

const Comment = ({ highlighted }) => (
  <Card shine={highlighted}>
    <CardContent>
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <Property label={NS.schema('dateCreated')} />
      </DetailsBar>
      <Property label={NS.schema('text')} />
    </CardContent>
    <ActionsBar small>
      <Property label={NS.schema('potentialAction')} />
    </ActionsBar>
    <CardAppendix>
      <Property forceRender clickToOpen={false} label={NS.app('omniform')} />
    </CardAppendix>
  </Card>
);

Comment.propTypes = hightlightPropTypes;

const CommentSection = ({ highlighted }) => (
  <CardMicroRow highlighted={highlighted}>
    <Property label={NS.schema('creator')} topology={cardListTopology} />&#9;<Property label={NS.schema('text')} topology={cardListTopology} />
  </CardMicroRow>
);

CommentSection.propTypes = hightlightPropTypes;

export default [
  LinkedRenderStore.registerRenderer(
    connectHighlighting(Comment),
    [NS.schema('Comment'), NS.argu('Comment')],
    RENDER_CLASS_NAME,
    containerTopology
  ),
  LinkedRenderStore.registerRenderer(
    connectHighlighting(CommentSection),
    [NS.schema('Comment'), NS.argu('Comment')],
    RENDER_CLASS_NAME,
    [cardAppendixTopology, cardListTopology, cardRowTopology]
  ),
];
