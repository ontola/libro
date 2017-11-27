import PropTypes from 'prop-types';
import React from 'react';

import './VoteData.scss';

const propTypes = {
  children: PropTypes.node,
};

const VoteData = ({ children }) => (
  <div className="VoteData__votebar">
    {children}
  </div>
);

VoteData.propTypes = propTypes;

export default VoteData;
