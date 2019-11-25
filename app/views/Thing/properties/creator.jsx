import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
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
  <LinkedResourceContainer
    hideName={hideName}
    subject={linkedProp}
    titleKey="postedBy"
  >
    {children}
  </LinkedResourceContainer>
);

Creator.type = schema.Thing;

Creator.property = schema.creator;

Creator.topology = detailsBarTopology;

Creator.propTypes = propTypes;

export default register(Creator);
