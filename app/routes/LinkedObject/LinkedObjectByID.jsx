import PropTypes from 'prop-types';
import React from 'react';
import { LinkedResourceContainer, Type } from 'link-redux';

import { Container } from 'components';

const propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      iri: PropTypes.string,
    }),
  }),
};

const LinkedObjectByID = ({ location }) => (
  <Container>
    <LinkedResourceContainer subject={location.query.iri}>
      <Type />
    </LinkedResourceContainer>
  </Container>
);

LinkedObjectByID.propTypes = propTypes;

export default LinkedObjectByID;
