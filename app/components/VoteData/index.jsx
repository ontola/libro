import './VoteData.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  votes: PropTypes.object.isRequired,
  result: PropTypes.string.isRequired,
};

const defaultProps = {
  votes: {},
};

const VoteData = ({
  result,
  votes,
}) => (
  <div className="VoteData">
    <div>Motie status: {result}</div>
    <div>Voor: {votes.yes.percentage}% ({votes.yes.count})</div>
    <div>Neutraal: {votes.abstain.percentage}% ({votes.abstain.count})</div>
    <div>Tegen: {votes.no.percentage}% ({votes.no.count})</div>
  </div>
);

VoteData.propTypes = propTypes;
VoteData.defaultProps = defaultProps;

export default VoteData;
