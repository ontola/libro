import {
  linkedPropType,
  LinkedResourceContainer,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  children: PropTypes.node,
  hideName: PropTypes.string,
  linkedProp: linkedPropType,
};

const Creator = ({ children, hideName, linkedProp }) => (
  <LinkedResourceContainer
    hideName={hideName}
    subject={linkedProp}
    titleKey="postedBy"
  >
    {children}
  </LinkedResourceContainer>
);

Creator.type = NS.schema('Thing');

Creator.property = NS.schema('creator');

Creator.topology = detailsBarTopology;

Creator.propTypes = propTypes;

export default register(Creator);
