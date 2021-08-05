import React from 'react';
import { Helmet } from 'react-helmet-async';

import CardContent from '../../components/Card/CardContent';
import Heading from '../../components/Heading';
import { Size } from '../../components/shared/config';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';

const NotFound = (): JSX.Element => (
  <Container size={Size.Small}>
    <Helmet title="404 Not Found" />
    <Heading>
      404 Niet gevonden
    </Heading>
    <Card>
      <CardContent>
        De pagina die je zocht is helaas niet gevonden...
      </CardContent>
    </Card>
  </Container>
);

export default NotFound;
