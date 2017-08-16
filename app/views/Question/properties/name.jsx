import React from 'react';

import {
  Heading,
  LDLink,
} from 'components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => (
    <Heading headerSize="3" variant="question">
      {linkedProp}
    </Heading>
  ),
  NS.argu('Question'),
  NS.schema('name')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => (
    <LDLink>
      <Heading headerSize="3" variant="question">{linkedProp}</Heading>
    </LDLink>
  ),
  NS.argu('Question'),
  NS.schema('name'),
  NS.argu('collection')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <span>{linkedProp}</span>,
  NS.argu('Question'),
  NS.schema('name'),
  NS.argu('parent')
);
