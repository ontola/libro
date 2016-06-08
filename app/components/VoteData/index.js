// @flow
import './votedata.scss';
import React, { PropTypes } from 'react';
import { Heading, Box } from '../';

const mapResults = {
  pass: 'aangenomen',
  fail: 'afgewezen',
};

const voteResult = (result) =>
  <span className={`vote__result vote__result--${result}`}>{mapResults[result]}</span>;

const voteChart = (result) => {
  return (
    <div className="vote__chart">
      <span className="vote__chart__fill vote__chart__fill--pass" style={{width: result.pass * 100 + '%' }}></span>
      <span className="vote__chart__fill vote__chart__fill--fail" style={{width: result.fail * 100 + '%' }}></span>
    </div>
  );
}

function voteDataExpanded(data) {
  return (
    <Box>
      <Heading size="4">Opinions {voteResult(data.result)}</Heading>
      {data.group_result.map(m => {
        const count = data.counts.find(e => e.group.name === m.group.name);
        return (
          <div key={m.group.name}>{m.group.name}: {m.result} ({count.value})</div>
        );
      })}
      {voteChart(data.result_aggs)}
    </Box>
  );
}

function voteDataUnexpanded(data) {
  return (
    <div>
      {voteResult(data.result)}
      {voteChart(data.result_aggs)}
    </div>
  );
}

function VoteData({ data, expanded }) {
  return expanded ? voteDataExpanded(data) : voteDataUnexpanded(data);
}

VoteData.propTypes = {
  data: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
};

VoteData.defaultProps = {
  data: {},
  expanded: false,
};

export default VoteData;
