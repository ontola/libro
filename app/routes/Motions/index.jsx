// @flow
import React from 'react';
import Helmet from 'react-helmet';

import MotionsContainer from '../../containers/MotionsContainer';
import { Container, Heading } from '../../components';

const Motions = () => (
  <Container>
    <Helmet title="Motions" />
    <Heading>Motions</Heading>
    <MotionsContainer />
  </Container>
);

export default Motions;
