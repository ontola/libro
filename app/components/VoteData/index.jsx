import './VoteData.scss';
import React, { PropTypes } from 'react';
import { Container, Opinions, VoteChart } from 'components';
import classNames from 'classnames';

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

const voteDataExpanded = (data) => {
  const opinionsPro = data.counts && data.counts.filter(o => o.option === 'yes');
  const opinionsCon = data.counts && data.counts.filter(o => o.option === 'no');

  return (
    <Container>
      <Opinions pro={opinionsPro} con={opinionsCon} />
      <VoteChart data={data.result_aggs} result={data.result} />
    </Container>
  );
};

const voteDataUnexpanded = (data) => <VoteChart data={data.result_aggs} result={data.result} />;

const VoteData = ({ data, expanded }) => {
  if (!data) return false;

  const voteDataClass = classNames({
    VoteData: true,
    'VoteData--expanded': expanded,
  });

  return (
    <div className={voteDataClass}>
      {expanded ? voteDataExpanded(data) : voteDataUnexpanded(data)}
    </div>
  );
};

VoteData.propTypes = propTypes;
VoteData.defaultProps = defaultProps;

export default VoteData;
