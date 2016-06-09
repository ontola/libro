// @flow
import React from 'react';
import { Heading, Box } from '../components';
import { PoliticiansContainer } from '../containers';
import Helmet from 'react-helmet';

function Politicians() {
  return (
    <div>
      <Helmet
        title="Politicians"
      />
      <Heading>Politicians</Heading>
      <Box>Hier komt een lijst met alle leden van de raad. </Box>
      <PoliticiansContainer />
    </div>
  );
}

export default Politicians;
