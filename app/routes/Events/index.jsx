import React from 'react';
import Helmet from 'react-helmet';

import EventsContainer from 'containers/EventsContainer';
import { Card, Container, Header } from 'components';

const Events = () => (
  <div>
    <Helmet title="Vergaderingen" />
    <Header />
    <Container>
      <Card>
        <EventsContainer />
      </Card>
    </Container>
  </div>
);

export default Events;
