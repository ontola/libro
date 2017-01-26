import { getP } from 'link-lib';
import React, { PropTypes } from 'react';

const propTypes = {
  data: PropTypes.object,
};

function getErrorMessage(code) {
  switch (code) {
    case 404:
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
