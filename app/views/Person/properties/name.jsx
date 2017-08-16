import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <p>{linkedProp}</p>,
  NS.schema('Person'),
  NS.schema('name'),
  NS.argu('sidebar')
);
