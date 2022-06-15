import React from 'react';
import { Helmet } from 'react-helmet-async';

import CardContent from '../../modules/Common/components/Card/CardContent';
import Heading from '../../modules/Common/components/Heading';
import { Size } from '../../themes/themes';
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
