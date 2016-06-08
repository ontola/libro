import './votechart.scss';
import React, { PropTypes } from 'react';
import { Heading, Box } from '../';

function VoteChart({ data }) {
  return (
    <div className="vote__chart">
      <span className="vote__chart__fill vote__chart__fill--pass" style={{width: data.pass * 100 + '%' }}></span>
      <span className="vote__chart__fill vote__chart__fill--fail" style={{width: data.fail * 100 + '%' }}></span>
    </div>
  );
}

VoteChart.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};

VoteChart.defaultProps = {
  data: false,
};

export default VoteChart;
