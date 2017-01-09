import React, { PropTypes } from 'react';
import { Collection } from 'immutable';

const propTypes = {
  data: PropTypes.instanceOf(Collection),
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
    {getErrorMessage(props.data.get('http://www.w3.org/2011/http#statusCodeValue'))}
  </p>
);

Error.propTypes = propTypes;

export default Error;
