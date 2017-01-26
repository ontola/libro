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
  <LinkedObjectContainer object={location.href} >
    <Container>
      <Property label="schema:isPartOf" />
      <Type />
      <Property label="argu:VoteEventCollection" />
      <Property forceRender label={['argu:collectionAssociation', 'schema:comments']} />
    </Container>
  </LinkedObjectContainer>
);

LinkedObject.propTypes = propTypes;

export default LinkedObject;

export { default as LinkedObjectByID } from './LinkedObjectByID';
