import React, { PropTypes } from 'react';
import { LinkedObjectContainer, Property, Type } from 'link-redux';

import {
  Container,
} from 'components';

const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object.isRequired,
};

const Forum = () => (
  <Container>
    <LinkedObjectContainer object={location.href} >
      <Type />
      <Property label={['argu:questions']} />
      <Property label={['argu:motions']} />
    </LinkedObjectContainer>
  </Container>
);

Forum.propTypes = propTypes;

export default Forum;
