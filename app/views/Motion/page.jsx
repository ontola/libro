import React, { PropTypes } from 'react';
import { LinkedObjectContainer, Property, Type } from 'link-redux';

import { Container } from 'components';

import LinkedRenderStore, { RENDER_CLASS_NAME } from '../../helpers/LinkedRenderStore';

const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object,
};

const Idea = () => (
  <LinkedObjectContainer object={location.href} topology={null} >
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

LinkedRenderStore.registerRenderer(
  Idea,
  'argu:Motion',
  RENDER_CLASS_NAME,
  'argu:page'
);

export default Idea;
