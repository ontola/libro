import React from 'react';

import './VoteData.scss';

export interface VoteDataProps {
  card?: boolean,
  children: React.ReactNode,
}

const VoteData = ({ card, children }: VoteDataProps): JSX.Element => (
  <div className={`VoteData__votebar ${card ? 'VoteData__votebar-card' : ''}`}>
    {children}
  </div>
);

export default VoteData;
