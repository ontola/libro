import React, { PropTypes } from 'react';
import { LinkedObjectContainer } from 'link-redux';

import {
  Container,
} from 'components';


const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object.isRequired,
};

const LinkedPerson = () => (
  <Container>
    <LinkedObjectContainer object={location.href} />
  </Container>
);

LinkedPerson.propTypes = propTypes;

export default LinkedPerson;
