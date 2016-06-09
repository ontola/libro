// @flow
import React from 'react';
import { MotionsContainer } from '../containers';
import { Heading } from '../components';
import Helmet from 'react-helmet';

function Motions() {
  return (
    <div>
      <Helmet
        title="Motions"
      />
      <Heading>Motions</Heading>
      <MotionsContainer />
    </div>
  );
}

export default Motions;
