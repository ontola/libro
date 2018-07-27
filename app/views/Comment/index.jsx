import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  ActionsBar,
  Card,
  CardAppendix,
  CardContent,
  CardMicroRow,
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
    <Property label={NS.schema('creator')} topology={NS.argu('section')} />&#9;<Property label={NS.schema('text')} topology={NS.argu('section')} />
  </CardMicroRow>
);

CommentSection.propTypes = hightlightPropTypes;

export default [
  LinkedRenderStore.registerRenderer(
    connectHighlighting(Comment),
    [NS.schema('Comment'), NS.argu('Comment')],
    RENDER_CLASS_NAME,
    [
      NS.argu('collection'),
      NS.argu('container'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    connectHighlighting(CommentSection),
    [NS.schema('Comment'), NS.argu('Comment')],
    RENDER_CLASS_NAME,
    [NS.argu('section'), NS.argu('cardRow')]
  ),
];
