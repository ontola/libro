import './votedata.scss';
import React, { PropTypes } from 'react';
import { Heading, Box, VoteChart } from '../';

const mapResults = {
  pass: 'aangenomen',
  fail: 'afgewezen',
};

const voteResult = (result) =>
  <span className={`vote__result vote__result--${result}`}>{mapResults[result]}</span>;

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
      <VoteChart data={data.result_aggs} />
    </Box>
  );
}

function voteDataUnexpanded(data) {
  return (
    <div className="vote">
      {voteResult(data.result)}
      <VoteChart data={data.result_aggs} />
    </div>
  );
}

function VoteData({ data, expanded }) {
  //console.log(data);
  if(!data) return false;
  return expanded ? voteDataExpanded(data) : voteDataUnexpanded(data);
}

VoteData.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  expanded: PropTypes.bool,
};

VoteData.defaultProps = {
  data: false,
  expanded: false,
};

export default VoteData;
