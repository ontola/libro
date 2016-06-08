import './votechart.scss';
import React, { PropTypes } from 'react';
import { Heading, Box } from '../';

function VoteChart({ data, result }) {
  const widthPass = data.pass * 100 + '%';
  const widthFail = data.fail * 100 + '%';

  return (
    <div className="votechart">
      <div className="votechart__container">
        <span className="votechart__fill votechart__fill--pass" style={{width: widthPass }} />
        <span className="votechart__fill votechart__fill--fail" style={{width: widthFail }} />
      </div>
      <div className="votechart__legend">
        <span>{ widthPass }</span>
        <span>{ result }</span>
        <span>{ widthFail }</span>
      </div>
    </div>
  );
}

VoteChart.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  result: PropTypes.oneOf([
    'pass',
    'fail',
  ]).isRequired,
};

VoteChart.defaultProps = {
  data: false,
  result: 'pass',
};

export default VoteChart;
