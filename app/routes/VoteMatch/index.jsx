import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { ProgressBar } from 'components';
import VoteMatchContainer from 'containers/VoteMatchContainer';
import { fetchVoteMatch } from 'state/voteMatch/actions';
import {
  getVoteMatchCountUserVotes,
  getVoteMatchMotionIdsLength,
  getVoteMatchName,
} from 'state/voteMatch/selectors';

import { currentLocation } from '../../helpers/paths';

const propTypes = {
  currentIndex: PropTypes.number,
  loadVoteMatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  motionsLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  params: PropTypes.shape({
    voteMatchId: PropTypes.string.isRequired,
  }).isRequired,
};

class VoteMatch extends Component {
  componentWillMount() {
    if (this.props.name === '') {
      this.props.loadVoteMatch(this.props.params.voteMatchId);
    }
  }

  render() {
    const {
      currentIndex,
      location,
      motionsLength,
      name
    } = this.props;

    return (
      <div className="ProgressBar__wrapper">
        <Helmet title={`Vergelijk opinies met ${name}`} />
        <VoteMatchContainer id={currentLocation(location)} />
        <ProgressBar
          completed={currentIndex}
          context={`VoteMatch - ${name}`}
          total={motionsLength}
        />
      </div>
    );
  }
}

VoteMatch.propTypes = propTypes;

export default connect(
  (state, props) => ({
    currentIndex: getVoteMatchCountUserVotes(state, props),
    motionsLength: getVoteMatchMotionIdsLength(state, props),
    name: getVoteMatchName(state, props),
  }),
  dispatch => ({
    loadVoteMatch: id => dispatch(fetchVoteMatch(id)),
  })
)(VoteMatch);

export { default as LinkVoteMatch } from './LinkVoteMatch';
