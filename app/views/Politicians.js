import React from 'react';
import { Heading, Box } from '../components';
import { PoliticiansContainer } from '../containers';

function Politicians() {
  return (
    <div>
      <Heading>Politicians</Heading>
      <Box>Hier komt een lijst met alle leden van de raad.</Box>
      <PoliticiansContainer />
    </div>
  );
}

export default Politicians;
