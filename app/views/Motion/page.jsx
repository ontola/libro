import { RENDER_CLASS_NAME } from 'link-lib';
import { LinkedObjectContainer, Property, Type } from 'link-redux';
import React, { PropTypes } from 'react';

import { Container } from 'components';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  linkedObject: PropTypes.object,
  params: PropTypes.object,
};

const Idea = () => (
  <LinkedObjectContainer object={location.href} topology={null} >
    <Container>
      <Property label={NS.schema('isPartOf')} />
      <Type />
      <Property label={NS.argu('voteEvents')} />
    </Container>
    <Container size="large">
      <Property label={NS.argu('arguments')} />
    </Container>
  </LinkedObjectContainer>
);

Idea.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Idea,
  NS.argu('Motion'),
  RENDER_CLASS_NAME,
  NS.argu('page')
);

export default Idea;
