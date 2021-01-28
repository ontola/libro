import * as schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  children: PropTypes.node,
  hideName: PropTypes.bool,
  linkedProp: linkedPropType,
};

const Creator = ({
  children,
  hideName,
  linkedProp,
}) => (
  <Resource
    hideName={hideName}
    subject={linkedProp}
    titleKey="postedBy"
  >
    {children}
  </Resource>
);

Creator.type = schema.Thing;

Creator.property = schema.creator;

Creator.topology = detailsBarTopology;

Creator.propTypes = propTypes;

export default register(Creator);
