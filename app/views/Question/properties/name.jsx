import LinkedRenderStore from 'link-lib';
import React from 'react';

import {
  Heading,
  LDLink,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => (
    <Heading headerSize="3" variant="question">
      {linkedProp.value}
    </Heading>
  ),
  NS.argu('Question'),
  NS.schema('name')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => (
    <LDLink>
      <Heading headerSize="3" variant="question">{linkedProp.value}</Heading>
    </LDLink>
  ),
  NS.argu('Question'),
  NS.schema('name'),
  NS.argu('collection')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <span>{linkedProp.value}</span>,
  NS.argu('Question'),
  NS.schema('name'),
  NS.argu('parent')
);
