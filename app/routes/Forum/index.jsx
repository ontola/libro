import { LinkedObjectContainer, Property, Type } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  Container,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object.isRequired,
};

const Forum = () => (
  <Container>
    <LinkedObjectContainer object={location.href} >
      <Type />
      <Property label={NS.argu('questions')} />
      <Property label={NS.argu('motions')} />
    </LinkedObjectContainer>
  </Container>
);

Forum.propTypes = propTypes;

export default Forum;
