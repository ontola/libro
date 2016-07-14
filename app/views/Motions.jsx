// @flow
import React from 'react';
import { MotionsContainer } from '../containers';
import { Container, Heading } from '../components';
import Helmet from 'react-helmet';

const Motions = () => (
  <Container>
    <Helmet
      title="Motions"
    />
    <Heading>Motions</Heading>
    <MotionsContainer />
  </Container>
);

export default Motions;
