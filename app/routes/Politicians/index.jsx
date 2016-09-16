
import React from 'react';
import PersonsContainer from 'containers/PersonsContainer';
import { Container } from 'components';
import Helmet from 'react-helmet';

const Politicians = () => (
  <Container>
    <Helmet title="Politici" />
    <PersonsContainer />
  </Container>
);

export default Politicians;
