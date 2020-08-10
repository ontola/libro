import PropTypes from 'prop-types';
import React from 'react';

import './Spinner.scss';

const propTypes = {
  loading: PropTypes.bool.isRequired,
};

interface Props {
  loading: boolean;
}

const Spinner: React.FC<Props> = ({ loading }) => (
  <div
    className={`Spinner ${loading ? 'Spinner--loading' : ''}`}
    data-testid="spinner"
  />
);

Spinner.propTypes = propTypes;

export default Spinner;
