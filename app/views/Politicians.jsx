// @flow
import React from 'react';
import { Heading, Box, Page } from '../components';
import Helmet from 'react-helmet';

const Politicians = () => (
  <Page>
    <Helmet
      title="Politicians"
    />
    <Heading>Politicians</Heading>
    <Box>
      <div className="box__content">
        Hier komt een lijst met alle leden van de raad.
      </div>
    </Box>
  </Page>
);

export default Politicians;
