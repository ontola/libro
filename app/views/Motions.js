import React, {Component} from 'react';
import { MotionsContainer } from '../containers';
import { Heading, Box } from '../components';

export default class Motions extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Heading>Motions</Heading>
        <Box>
          <MotionsContainer />
        </Box>
      </div>
    );
  }
}
