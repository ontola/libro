import React from 'react';
import Helmet from 'react-helmet';

import {
  Container,
  Header,
} from 'components';

const Parties = () => (
  <div>
    <Helmet title="Partijen" />
    <Header />
    <Container>
      Hier komen de partijen :)
    </Container>
  </div>
);

export default Parties;
