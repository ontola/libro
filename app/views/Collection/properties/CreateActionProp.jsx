import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const CreateActionProp = ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} />;

CreateActionProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  CreateActionProp,
  'schema:Thing',
  'https://argu.co/ns/core#createAction'
);

export default CreateActionProp;
