import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const CreateActionProp = ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} />;

CreateActionProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  CreateActionProp,
  NS.schema('Thing'),
  NS.argu('newAction')
);
