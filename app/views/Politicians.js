import React from 'react';
import { Heading, Box } from '../components';
import { PoliticiansContainer } from '../containers';

function Politicians() {
  return (
    <div>
      <Heading>Politicians</Heading>
      <Box>
        <p>Hier komt een lijst met alle leden van de raad.</p>
      </Box>
      <PoliticiansContainer />
    </div>
  );
}

export default Politicians;
