import React from 'react';

import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import {
  Detail,
  LDLink,
  ProfileCard,
} from 'components';

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
  'http://schema.org/Person',
  RENDER_CLASS_NAME,
  'detail'
);

// export default Person;
