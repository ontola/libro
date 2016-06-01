import React, {Component} from 'react';
import { Heading, Box } from '../components';
import { PoliticiansContainer } from '../containers';

export default class Politicians extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Heading>Politicians</Heading>
        <Box>Hier komt een lijst met alle leden van de raad.</Box>
        <PoliticiansContainer />
      </div>
    );
  }
}
