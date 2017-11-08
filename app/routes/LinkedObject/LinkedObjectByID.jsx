import React, { PropTypes } from 'react';
import { LinkedObjectContainer, Type } from 'link-redux';

import {
  Container,
} from 'components';
import RelationsBrowserContainer from 'containers/RelationsBrowserContainer';

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
      <RelationsBrowserContainer />
    </LinkedObjectContainer>
  </Container>
);

LinkedObjectByID.propTypes = propTypes;

export default LinkedObjectByID;
