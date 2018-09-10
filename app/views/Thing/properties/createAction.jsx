import LinkedRenderStore from 'link-lib';
import {
  link,
  linkedPropType,
  LinkedResourceContainer,
  subjectType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  createAction: subjectType,
  isPartOf: linkedPropType,
};

const CreateAction = ({ createAction, isPartOf }) => (
  <LinkedResourceContainer isPartOf={isPartOf} subject={createAction} />
);

CreateAction.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.argu('createAction'), NS.schema('isPartOf')])(CreateAction),
  [NS.schema('Thing'), NS.link('Document')],
  NS.argu('createAction'),
  allTopologies
);
