// @flow
import React from 'react';
import Helmet from 'react-helmet';

import DocumentContainer from 'containers/DocumentContainer';
import { Container } from 'components';

const Document = (props) => (
  <Container>
    <Helmet title="Document" />
    <DocumentContainer {...props} />
  </Container>
);

export default Document;
