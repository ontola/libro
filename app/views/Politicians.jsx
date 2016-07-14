// @flow
import React from 'react';
import PoliticiansContainer from '../containers/PoliticiansContainer';
import { Container, Heading } from '../components';
import Helmet from 'react-helmet';

const Politicians = () => (
  <Container>
    <Helmet
      title="Politicians"
    />
    <Heading>Politicians</Heading>
    <PoliticiansContainer />
  </Container>
);

export default Politicians;
