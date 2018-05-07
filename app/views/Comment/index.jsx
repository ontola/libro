import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  ActionsBar,
  Card,
  CardAppendix,
  CardContent,
  DetailsBar,
} from '../../components';
import { connectHighlighting, hightlightPropTypes } from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';

const Comment = ({ highlighted }) => (
  <Card shine={highlighted}>
    <CardContent>
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <Property label={NS.schema('dateCreated')} />
      </DetailsBar>
      <Property label={NS.schema('text')} />
      <ActionsBar small>
        <Property label={NS.hydra('operation')} />
      </ActionsBar>
    </CardContent>
    <CardAppendix>
      <Property forceRender clickToOpen={false} label={NS.app('omniform')} />
    </CardAppendix>
  </Card>
);

Comment.propTypes = hightlightPropTypes;

const CommentSection = ({ highlighted }) => (
  <div className={highlighted ? 'Card--shine' : ''} style={{ margin: '.2em' }}>
    <Property label={NS.schema('creator')} />&#9;<Property label={NS.schema('text')} />
  </div>
);

CommentSection.propTypes = hightlightPropTypes;

export default [
  LinkedRenderStore.registerRenderer(
    connectHighlighting(Comment),
    [NS.schema('Comment'), NS.argu('Comment')],
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('collection'),
      NS.argu('container'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    connectHighlighting(CommentSection),
    [NS.schema('Comment'), NS.argu('Comment')],
    RENDER_CLASS_NAME,
    NS.argu('section')
  ),
];
