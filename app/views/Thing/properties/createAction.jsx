import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  link,
  linkType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  createAction: subjectType,
  isPartOf: linkType,
  omniform: PropTypes.bool,
};

const CreateAction = ({
  createAction,
  isPartOf,
  omniform,
}) => (
  <LinkedResourceContainer isPartOf={isPartOf} omniform={omniform} subject={createAction} />
);

CreateAction.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.ontola('createAction'), NS.schema('isPartOf')])(CreateAction),
  [NS.schema('Thing'), NS.link('Document')],
  NS.ontola('createAction'),
  allTopologies
);
