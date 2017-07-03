import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Detail,
  LDLink,
  ProfileCard,
} from 'components';

import './sidebar';
import './properties/image';

LinkedRenderStore.registerRenderer(
  ProfileCard,
  [
    'http://schema.org/Person',
    'http://xmlns.com/foaf/0.1/Person',
  ]
);

const PersonDetail = () => (
  <LDLink>
    <Detail label="schema:name" />
  </LDLink>
);

LinkedRenderStore.registerRenderer(
  PersonDetail,
  ['http://schema.org/Person'],
  RENDER_CLASS_NAME,
  'detail'
);

LinkedRenderStore.registerRenderer(
  () => <Property label="schema:image" />,
  ['http://schema.org/Person', 'aod:Persons'],
  RENDER_CLASS_NAME,
  'voteBubble'
);

// export default Person;
