
import React from 'react';
import Helmet from 'react-helmet';

import MotionsContainer from 'containers/MotionsContainer';
import { Container, Heading } from 'components';

const Motions = () => (
  <Container>
    <Helmet title="Moties" />
    <Heading>Moties</Heading>
    <MotionsContainer />
  </Container>
);

export default Motions;
