import React from 'react';

import './Spinner.scss';

interface Props {
  loading: boolean;
}

const Spinner: React.FC<Props> = ({ loading }) => (
  <div
    className={`Spinner ${loading ? 'Spinner--loading' : ''}`}
    data-testid="spinner"
  />
);

Spinner.defaultProps = {
  loading: true,
};

export default Spinner;
