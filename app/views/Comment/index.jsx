import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Card,
  CardContent,
  DetailsBar,
  LinkedDetailDate,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

const Comment = () => (
  <Card>
    <CardContent>
      <DetailsBar>
        <LinkedDetailDate />
        <Property label={NS.schema('creator')} />
      </DetailsBar>
      <Property label={NS.schema('text')} />
    </CardContent>
  </Card>
);

LinkedRenderStore.registerRenderer(Comment, NS.schema('Comment'));
LinkedRenderStore.registerRenderer(
  Comment,
  [NS.schema('Comment'), NS.argu('Comment')],
  RENDER_CLASS_NAME,
  NS.argu('collection')
);

export default Comment;
