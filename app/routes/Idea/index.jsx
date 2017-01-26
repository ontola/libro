import React, { PropTypes } from 'react';
import { LinkedObjectContainer, Property, Type } from 'link-redux';

import { Container } from 'components';

const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object.isRequired,
};

const Idea = () => (
  <LinkedObjectContainer object={location.href} >
    <Container>
      <Property label="schema:isPartOf" />
      <Type />
      <Property label="argu:voteEvents" />
    </Container>
    <Container size="large">
      <Property label="argu:arguments" />
    </Container>
  </LinkedObjectContainer>
);

Idea.propTypes = propTypes;

export default Idea;
