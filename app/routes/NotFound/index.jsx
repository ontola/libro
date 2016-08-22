
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import {
  Box,
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
    <Box>
      De pagina die je zocht is helaas niet gevonden...
    </Box>
  </Container>
);

NotFound.PropTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;
