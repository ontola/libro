import './Spinner.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  loading: PropTypes.bool.isRequired,
};

const Spinner = ({ loading }) => (
  <div className={`Spinner ${loading ? 'Spinner--loading' : ''}`} />
);

Spinner.propTypes = propTypes;

export default Spinner;
