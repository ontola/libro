// @flow
import React from 'react';
import PersonsContainer from '../containers/PersonsContainer';
import { Container, Heading } from '../components';
import Helmet from 'react-helmet';

const Politicians = () => (
  <Container>
    <Helmet
      title="Politicians"
    />
    <Heading>Politicians</Heading>
    <PersonsContainer />
  </Container>
);

export default Politicians;
