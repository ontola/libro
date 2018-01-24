import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

export default LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <LinkedResourceContainer subject={linkedProp} topology={NS.argu('section')} />,
  NS.schema('Question'),
  NS.argu('motions'),
  NS.argu('collection')
);
