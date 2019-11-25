import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { CardContent } from '../../components';
import { connectHighlighting, hightlightPropTypes } from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix, { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardListTopology } from '../../topologies/Card/CardList';
import CardMicroRow, { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';

const Comment = ({ depth = 0, highlighted }) => (
  <React.Fragment>
    <Card shine={highlighted}>
      <DetailsBar
        right={(
          <Property label={ontola.actionsMenu} />
        )}
      >
        <Property label={schema.creator} />
        <Property label={schema.dateCreated} />
      </DetailsBar>
      <CardContent>
        <Property label={NS.argu('opinion')} onLoad={() => null} />
        <Property label={schema.text} />
      </CardContent>
      <ActionsBar small>
        <Property label={ontola.favoriteAction} onLoad={() => null} />
        <Property label={schema.comment} onLoad={() => null}>
          <Property omniform label={ontola.createAction} />
        </Property>
      </ActionsBar>
      <CardAppendix>
        <Property forceRender clickToOpen={false} label={NS.app('omniform')} />
      </CardAppendix>
    </Card>
    <Property
      clickToOpen
      depth={depth + 1}
      label={schema.comment}
      onLoad={() => null}
    />
  </React.Fragment>
);

Comment.propTypes = hightlightPropTypes;

const CommentSection = ({ highlighted }) => (
  <CardMicroRow highlighted={highlighted}>
    <Property
      label={schema.creator}
    />&#9;<Property label={schema.text} />
  </CardMicroRow>
);

CommentSection.propTypes = hightlightPropTypes;

export default [
  LinkedRenderStore.registerRenderer(
    connectHighlighting(Comment),
    [schema.Comment, NS.argu('Comment')],
    RENDER_CLASS_NAME,
    containerTopology
  ),
  LinkedRenderStore.registerRenderer(
    connectHighlighting(CommentSection),
    [schema.Comment, NS.argu('Comment')],
    RENDER_CLASS_NAME,
    [cardAppendixTopology, cardListTopology, cardMicroRowTopology, cardRowTopology]
  ),
];
