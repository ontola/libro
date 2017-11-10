import HttpStatus from 'http-status-codes';
import { getP } from 'link-lib';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  data: PropTypes.shape({
    'http://www.w3.org/2011/http#statusCodeValue': PropTypes.number,
  }),
};

function getErrorMessage(code) {
  switch (code) {
    case HttpStatus.NOT_FOUND:
      return 'Object could not be found';
    default:
      return 'An unknown error occurred';
  }
}

const Error = props => (
  <p>
    {getErrorMessage(getP(props.data, 'http://www.w3.org/2011/http#statusCodeValue'))}
  </p>
);

Error.propTypes = propTypes;

export default Error;
