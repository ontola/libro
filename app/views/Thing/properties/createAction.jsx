import schema from '@ontologies/schema';
import {
  Resource,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import link from '../../../ontology/link';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

const CreateAction = ({
  createAction,
  isPartOf,
  omniform,
  onLoad,
}) => (
  <Resource
    isPartOf={isPartOf}
    omniform={omniform}
    subject={createAction}
    onLoad={onLoad}
  />
);

CreateAction.type = [
  schema.Thing,
  link.Document,
];

CreateAction.property = ontola.createAction;

CreateAction.topology = allTopologies;

CreateAction.mapDataToProps = {
  createAction: ontola.createAction,
  isPartOf: schema.isPartOf,
};

CreateAction.propTypes = {
  createAction: subjectType,
  isPartOf: linkType,
  omniform: PropTypes.bool,
  onLoad: PropTypes.func,
};

export default register(CreateAction);
