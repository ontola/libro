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
      <Property label="argu:attachments" />
      <Property label="argu:VoteEventCollection" />
    </Container>
    <Container size="large">
      <Property forceRender label={['argu:collectionAssociation', 'schema:comments']} />
    </Container>
  </LinkedObjectContainer>
);

LinkedObject.propTypes = propTypes;

export default LinkedObject;

export { default as LinkedObjectByID } from './LinkedObjectByID';
export { default as LinkPage } from './LinkPage';
