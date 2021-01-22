import React from 'react';

const DetailText: React.FC = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <span className="Detail__text" data-test="Detail-text">
      {children}
    </span>
  );
};

export default DetailText;
