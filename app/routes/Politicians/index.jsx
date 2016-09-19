
import React from 'react';
import Helmet from 'react-helmet';

import PersonsContainer from 'containers/PersonsContainer';
import {
  Container,
  Header,
} from 'components';

const Politicians = () => (
  <div>
    <Helmet title="Politici" />
    <Header />
    <Container>
      <PersonsContainer />
    </Container>
  </div>
);

export default Politicians;
