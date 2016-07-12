// @flow
import React, { PropTypes } from 'react';
import { Heading, Page } from '../components';
import Helmet from 'react-helmet';

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
  <Page>
    <Helmet title="404 Not Found" />
    <Heading>404 Niet gevonden</Heading>
  </Page>
);

NotFound.PropTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;
