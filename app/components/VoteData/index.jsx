import PropTypes from 'prop-types';
import React from 'react';

import './VoteData.scss';

const propTypes = {
  card: PropTypes.bool,
  children: PropTypes.node,
};

const VoteData = ({ card, children }) => (
  <div className={`VoteData__votebar ${card ? 'VoteData__votebar-card' : ''}`}>
    {children}
  </div>
);

VoteData.propTypes = propTypes;

export default VoteData;
