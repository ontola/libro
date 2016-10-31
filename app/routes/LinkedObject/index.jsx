import React, { PropTypes } from 'react';
import { LinkedObjectContainer, Property, Type } from 'link-redux';

import {
  Container,
} from 'components';

const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object.isRequired,
};

const LinkedObject = () => (
  <Container>
    <LinkedObjectContainer object={location.href} >
      <Property label="schema:isPartOf" />
      <Type />
      <Property label="argu:collectionAssociation" />
    </LinkedObjectContainer>
  </Container>
);

LinkedObject.propTypes = propTypes;

export default LinkedObject;

export { default as LinkedObjectByID } from './LinkedObjectByID';
