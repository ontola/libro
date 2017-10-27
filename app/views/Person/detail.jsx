import { RENDER_CLASS_NAME } from 'link-lib';
import React from 'react';

import {
  Detail,
  LDLink,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

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
