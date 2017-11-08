import React from 'react';
import Helmet from 'react-helmet';

import {
  Card,
  CardContent,
  Container,
  Heading,
} from 'components';

const NotFound = () => (
  <Container size="small">
    <Helmet title="404 Not Found" />
    <Heading>404 Niet gevonden</Heading>
    <Card>
      <CardContent>
        De pagina die je zocht is helaas niet gevonden...
      </CardContent>
    </Card>
  </Container>
);

export default NotFound;
