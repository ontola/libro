import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const CreateAction = ({
  createAction,
  isPartOf,
  omniform,
}) => (
  <LinkedResourceContainer isPartOf={isPartOf} omniform={omniform} subject={createAction} />
);

CreateAction.type = [
  schema.Thing,
  NS.link('Document'),
];

CreateAction.property = NS.ontola('createAction');

CreateAction.topology = allTopologies;

CreateAction.mapDataToProps = {
  createAction: NS.ontola('createAction'),
  isPartOf: schema.isPartOf,
};

CreateAction.propTypes = {
  createAction: subjectType,
  isPartOf: linkType,
  omniform: PropTypes.bool,
};

export default register(CreateAction);
