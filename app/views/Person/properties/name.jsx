import LinkedRenderStore from 'link-lib';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

export default LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <p>{linkedProp}</p>,
  NS.schema('Person'),
  NS.schema('name'),
  NS.argu('sidebar')
);
