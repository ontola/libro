// @flow
import React from 'react';
import { MotionsContainer } from '../containers';
import { Heading, Page } from '../components';
import Helmet from 'react-helmet';

function Motions() {
  return (
    <Page>
      <Helmet
        title="Motions"
      />
      <Heading>Motions</Heading>
      <MotionsContainer />
    </Page>
  );
}

export default Motions;
