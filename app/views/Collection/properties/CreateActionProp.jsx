import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const CreateActionProp = ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} />;

CreateActionProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  CreateActionProp,
  NS.schema('Thing'),
  NS.argu('createAction')
);

export default CreateActionProp;
