import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { LinkedResourceContainer, Property, Type } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Container } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { currentLocation } from '../../helpers/paths';

const propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
};

const Idea = ({ location }) => (
  <LinkedResourceContainer subject={currentLocation(location)} topology={null} >
    <Container>
      <Property label={NS.schema('isPartOf')} />
      <Type />
      <Property label={NS.argu('voteEvents')} />
    </Container>
    <Container size="large">
      <Property label={NS.argu('arguments')} />
    </Container>
  </LinkedResourceContainer>
);

Idea.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Idea,
  NS.argu('Motion'),
  RENDER_CLASS_NAME,
  NS.argu('page')
);

export default Idea;
