import './Spinner.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  loading: PropTypes.bool.isRequired,
};

const defaultProps = {
  loading: false,
};

const Spinner = ({ loading }) => (
  <div className={`Spinner ${loading ? 'Spinner--loading' : ''}`} />
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
