import React from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import {
  Heading,
  LDLink,
} from 'components';

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => (
    <Heading headerSize="3" variant="question">
      {linkedProp}
    </Heading>
  ),
  'argu:Question',
  'http://schema.org/name'
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => (
    <LDLink>
      <Heading headerSize="3" variant="question">{linkedProp}</Heading>
    </LDLink>
  ),
  'argu:Question',
  'http://schema.org/name',
  'argu:collection'
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <span>{linkedProp}</span>,
  'argu:Question',
  'http://schema.org/name',
  'argu:parent'
);
