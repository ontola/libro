import React, { PropTypes } from 'react';

import './Spinner.scss';

const propTypes = {
  loading: PropTypes.bool.isRequired,
};

const Spinner = ({ loading }) => (
  <div className={`Spinner ${loading ? 'Spinner--loading' : ''}`} />
);

Spinner.propTypes = propTypes;

export default Spinner;
