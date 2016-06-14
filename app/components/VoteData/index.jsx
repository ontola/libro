// @flow
import './votedata.scss';
import React, { PropTypes } from 'react';
import { Heading, Box, VoteChart, Opinions } from '../';

const propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  expanded: PropTypes.bool,
};

const defaultProps = {
  data: false,
  expanded: false,
};

function voteDataExpanded(data) {
  const opinionsPro = data.counts && data.counts.filter(o => o.option === 'yes');
  const opinionsCon = data.counts && data.counts.filter(o => o.option === 'no');

  return (
    <Box ghost>
      <Opinions pro={opinionsPro} con={opinionsCon} />
      <VoteChart data={data.result_aggs} result={data.result} />
    </Box>
  );
}

function voteDataUnexpanded(data) {
  return (
    <div className="vote">
      <VoteChart data={data.result_aggs} result={data.result} />
    </div>
  );
}

function VoteData({ data, expanded }) {
  if (!data) return false;
  return expanded ? voteDataExpanded(data) : voteDataUnexpanded(data);
}

VoteData.propTypes = propTypes;
VoteData.defaultProps = defaultProps;

export default VoteData;
