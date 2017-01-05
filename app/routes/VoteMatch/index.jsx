import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { ProgressBar } from 'components';
import VoteMatchContainer from 'containers/VoteMatchContainer';
import { fetchVoteMatch } from 'state/voteMatch/actions';

import {
  getVoteMatchCountUserVotes,
  getVoteMatchMotionsLength,
  getVoteMatchName,
} from 'state/voteMatch/selectors';

const propTypes = {
  currentIndex: PropTypes.number,
  loadVoteMatch: PropTypes.func.isRequired,
  motionsLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  params: PropTypes.shape({
    voteMatchId: PropTypes.string.isRequired,
  }).isRequired,
};

const defaultProps = {
  name: '',
};

function currentUrl() {
  return window.location.href;
}

class VoteMatch extends Component {
  componentWillMount() {
    if (this.props.name === '') {
      this.props.loadVoteMatch(this.props.params.voteMatchId);
    }
  }

  render() {
    const { currentIndex, motionsLength, name } = this.props;

    return (
      <div className="ProgressBar__wrapper">
        <Helmet title={`Vergelijk opinies met ${name}`} />
        <VoteMatchContainer id={currentUrl()} />
        <ProgressBar
          context={`VoteMatch - ${name}`}
          completed={currentIndex}
          total={motionsLength}
        />
      </div>
    );
  }
}

VoteMatch.propTypes = propTypes;
VoteMatch.defaultProps = defaultProps;

export default connect(
  (state, props) => ({
    name: getVoteMatchName(state, props),
    currentIndex: getVoteMatchCountUserVotes(state, props),
    motionsLength: getVoteMatchMotionsLength(state, props),
  }),
  dispatch => ({
    loadVoteMatch: id => dispatch(fetchVoteMatch(id)),
  })
)(VoteMatch);
