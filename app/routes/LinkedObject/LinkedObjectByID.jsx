import React, { PropTypes } from 'react';
import { LinkedObjectContainer, Type } from 'link-redux';

import {
  Container,
} from 'components';
import RelationsBrowserContainer from 'containers/RelationsBrowserContainer';

const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object.isRequired,
};

const LinkedObjectByID = router => (
  <Container>
    <LinkedObjectContainer object={router.location.query.iri} >
      <Type />
      <RelationsBrowserContainer />
    </LinkedObjectContainer>
  </Container>
);

LinkedObjectByID.propTypes = propTypes;

export default LinkedObjectByID;
