import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Detail,
  LDLink,
  ProfileCard,
} from 'components';


import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './sidebar';
import './properties/image';

LinkedRenderStore.registerRenderer(
  ProfileCard,
  [
    NS.schema('Person'),
    NS.foaf('Person'),
  ]
);

const PersonDetail = () => (
  <LDLink>
    <Detail label={NS.schema('name')} />
  </LDLink>
);

LinkedRenderStore.registerRenderer(
  PersonDetail,
  NS.schema('Person'),
  RENDER_CLASS_NAME,
  NS.argu('detail')
);

LinkedRenderStore.registerRenderer(
  () => <Property label={NS.schema('image')} />,
  [NS.schema('Person'), NS.aod('Persons')],
  RENDER_CLASS_NAME,
  NS.argu('voteBubble')
);

// export default Person;
