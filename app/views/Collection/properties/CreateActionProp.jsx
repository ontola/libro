import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const CreateActionProp = ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} />;

CreateActionProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  CreateActionProp,
  NS.schema('Thing'),
  NS.argu('newAction')
);

export default CreateActionProp;
