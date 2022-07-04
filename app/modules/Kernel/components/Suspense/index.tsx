import PropTypes from 'prop-types';
import React from 'react';

import LinkLoader from '../LinkLoader';

const Suspense: React.FC<any> = ({ children, fallback }) => {
  if (!__CLIENT__) {
    return fallback;
  }

  return (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  );
};

Suspense.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
};

Suspense.defaultProps = {
  fallback: <LinkLoader />,
};

export default Suspense;
