// @flow
import React from 'react';
import PoliticiansContainer from '../containers/PoliticiansContainer';
import { Heading, Page } from '../components';
import Helmet from 'react-helmet';

const Politicians = () => (
  <Page>
    <Helmet
      title="Politicians"
    />
    <Heading>Politicians</Heading>
    <PoliticiansContainer />
  </Page>
);

export default Politicians;
