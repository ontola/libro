import PropTypes from 'prop-types';
import React from 'react';
import { LinkedObjectContainer, Type } from 'link-redux';

import {
  Container,
} from 'components';

const propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      iri: PropTypes.string,
    }),
  }),
};

const LinkedObjectByID = ({ location }) => (
  <Container>
    <LinkedObjectContainer object={location.query.iri} >
      <Type />
    </LinkedObjectContainer>
  </Container>
);

LinkedObjectByID.propTypes = propTypes;

export default LinkedObjectByID;
