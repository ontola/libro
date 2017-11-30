import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import React from 'react';

import {
  Detail,
  LDLink,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

const PersonDetail = () => (
  <LDLink>
    <Detail label={NS.schema('name')} />
  </LDLink>
);

export default LinkedRenderStore.registerRenderer(
  PersonDetail,
  NS.schema('Person'),
  RENDER_CLASS_NAME,
  NS.argu('detail')
);
