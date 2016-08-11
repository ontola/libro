// @flow
import React from 'react';
import DocumentContainer from '../../containers/DocumentContainer';
import { Container } from '../../components';
import Helmet from 'react-helmet';

const Document = (props) => (
  <Container>
    <Helmet title="Document" />
    <DocumentContainer {...props} />
  </Container>
);

export default Document;
