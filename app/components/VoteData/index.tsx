import clsx from 'clsx';
import React from 'react';

import './VoteData.scss';

export interface VoteDataProps {
  card?: boolean;
  children: React.ReactNode;
  hover?: boolean;
}

const VoteData = ({
  card,
  children,
  hover,
}: VoteDataProps): JSX.Element => {
  const className = clsx({
    'VoteData__votebar': true,
    'VoteData__votebar-card': card,
    'VoteData__votebar-hover': hover,
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
};

VoteData.defaultProps = {
  hover: true,
};

export default VoteData;
