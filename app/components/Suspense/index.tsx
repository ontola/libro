import React from 'react';

import LinkLoader from '../Loading/LinkLoader';

interface SuspenseProps {
  children: JSX.Element;
  fallback: JSX.Element;
}

const Suspense: React.FC<SuspenseProps> = ({ children, fallback }) => {
  if (!__CLIENT__) {
    return fallback;
  }

  return (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  );
};

Suspense.defaultProps = {
  fallback: <LinkLoader />,
};

export default Suspense;
