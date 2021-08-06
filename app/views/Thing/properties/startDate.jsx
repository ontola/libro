import * as schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
  relative: PropTypes.bool,
};

const StartDate = ({ linkedProp, relative }) => (
  <DetailDate
    relative={relative}
    startDate={linkedProp}
  />
);

StartDate.type = schema.Thing;

StartDate.property = schema.startDate;

StartDate.topology = allTopologies;

StartDate.propTypes = propTypes;

StartDate.defaultProps = {
  relative: true,
};

export default register(StartDate);
