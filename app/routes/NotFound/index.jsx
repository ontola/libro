
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import {
  Card,
  CardContent,
  Container,
  Heading,
} from 'components';

const propTypes = {
  params: PropTypes.shape({
    motionId: PropTypes.number,
  }),
};

const defaultProps = {
  params: {
    motionId: 0,
  },
};

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

NotFound.PropTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;
