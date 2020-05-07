import schema from '@ontologies/schema';
import {
  Resource,
  linkType,
  linkedPropType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import link from '../../../ontology/link';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

const CreateAction = ({
  linkedProp,
  isPartOf,
  omniform,
  onLoad,
}) => (
  <Resource
    isPartOf={isPartOf}
    omniform={omniform}
    subject={linkedProp}
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
  isPartOf: schema.isPartOf,
};

CreateAction.propTypes = {
  isPartOf: linkType,
  linkedProp: linkedPropType,
  omniform: PropTypes.bool,
  onLoad: PropTypes.func,
};

export default register(CreateAction);
