import { LinkedResourceContainer, Property, Type } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { currentLocation } from '../../helpers/paths';
import Container from '../../topologies/Container';

const propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
};

const Forum = ({ location }) => (
  <Container>
    <LinkedResourceContainer subject={currentLocation(location)}>
      <Type />
      <Property label={NS.argu('questions')} />
      <Property label={NS.argu('motions')} />
    </LinkedResourceContainer>
  </Container>
);

Forum.propTypes = propTypes;

export default Forum;
