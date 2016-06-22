// @flow
import React from 'react';
import DocumentContainer from '../containers/DocumentContainer';
import { Heading, Page } from '../components';
import Helmet from 'react-helmet';

const Document = (props) => (
  <Page>
    <Helmet title="Document" />
    <DocumentContainer {...props} />
  </Page>
);

export default Document;
