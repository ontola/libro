import './votechart.scss';
import React, { PropTypes } from 'react';
import { Heading, Box } from '../';

const propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  result: PropTypes.oneOf([
    'pass',
    'fail',
  ]).isRequired,
};

const defaultProps = {
  data: false,
  result: 'pass',
};

function VoteChart({ data, result }) {
  const widthPass = data.pass * 100 + '%';
  const widthFail = data.fail * 100 + '%';

  return (
    <div className="VoteChart">
      <div className="VoteChart__container">
        <span className="VoteChart__fill VoteChart__fill--pass" style={{width: widthPass }} />
        <span className="VoteChart__fill VoteChart__fill--fail" style={{width: widthFail }} />
      </div>
      <div className="VoteChart__legend">
        <span>{ widthPass }</span>
        <span>{ result }</span>
        <span>{ widthFail }</span>
      </div>
    </div>
  );
}

VoteChart.propTypes = propTypes;
VoteChart.defaultProps = defaultProps;

export default VoteChart;
