import React from 'react';
import Helmet from 'react-helmet';

import MotionsContainer from 'containers/MotionsContainer';
import { Card, Container, Header } from 'components';

const Motions = () => (
  <div>
    <Helmet title="Moties" />
    <Header />
    <Container>
      <Card>
        <MotionsContainer />
      </Card>
    </Container>
  </div>
);

export default Motions;
