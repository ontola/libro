import { LinkedObjectContainer, Property, Type } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  Container,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { currentLocation } from '../../helpers/paths';

const propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
};

const Forum = ({ location }) => (
  <Container>
    <LinkedObjectContainer object={currentLocation(location)} >
      <Type />
      <Property label={NS.argu('questions')} />
      <Property label={NS.argu('motions')} />
    </LinkedObjectContainer>
  </Container>
);

Forum.propTypes = propTypes;

export default Forum;
