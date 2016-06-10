// @flow
import React from 'react';
import { Heading, Box } from '../components';
import Helmet from 'react-helmet';

const Politicians = ({}) => {
  return (
    <div>
      <Helmet
        title="Politicians"
      />
      <Heading>Politicians</Heading>
      <Box>Hier komt een lijst met alle leden van de raad. </Box>
    </div>
  );
}

export default Politicians;
