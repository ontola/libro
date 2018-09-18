import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { ProgressBar } from '../../components';
import LinkVoteMatchContainer from '../../containers/LinkVoteMatchContainer';

const propTypes = {
  current: PropTypes.number,
  name: PropTypes.string,
  url: PropTypes.string,
};

const voteMatchUrl = (url) => {
  const u = new URL(url);
  return `${u.origin}${u.pathname}`;
};

const LinkVoteMatch = ({
  current,
  name,
  url,
}) => (
  <div className="ProgressBar__wrapper">
    <Helmet title={`Vergelijk opinies met ${name}`} />
    <LinkVoteMatchContainer object={voteMatchUrl(url)} step={current} />
    <ProgressBar
      completed={current == null ? 0 : current + 1}
      context="VoteMatch - nop"
      total={5}
    />
  </div>
);

LinkVoteMatch.propTypes = propTypes;

export default connect(state => ({
  current: state.getIn(['voteMatch', 'currentIndex']),
  url: window.location.href,
}))(LinkVoteMatch);
