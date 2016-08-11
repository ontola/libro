// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MotionShow } from 'components';
import Motion from 'models/Motion';
import { voteMatchNext, voteAction } from 'state/votematch/actions';

const renderMotion = (data, vote, activeVoteMatch, next, showArguments) => (
  <MotionShow
    data={data}
    onVote={vote}
    showArguments={showArguments}
    activeVoteMatch={activeVoteMatch}
    next={next}
  />
);

const propTypes = {
  activeVoteMatch: PropTypes.bool,
  creator: PropTypes.object,
  data: PropTypes.instanceOf(Motion),
  loadMotion: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  next: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  showArguments: PropTypes.bool,
  vote: PropTypes.func.isRequired,
};

const defaultProps = {
  renderItem: renderMotion,
  showArguments: false,
};

class MotionContainer extends Component {
  componentWillMount() {
    const {
      data,
      loadMotion,
      motionId,
    } = this.props;

    if (data === undefined) {
      loadMotion(motionId);
    }
  }

  render() {
    const {
      activeVoteMatch,
      data,
      next,
      renderItem,
      showArguments,
      vote,
    } = this.props;

    if (data) {
      return renderItem(
        data,
        vote,
        activeVoteMatch,
        next,
        showArguments
      );
    }
    return false;
  }
}

MotionContainer.propTypes = propTypes;
MotionContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => {
    const findMotion = state.getIn(['motions', 'items', ownProps.motionId]);
    return {
      data: findMotion,
    };
  },
  (dispatch) => ({
    loadMotion: (id) => dispatch(Motion.fetch(id)),
    next: () => dispatch(voteMatchNext()),
    vote: (data) => dispatch(voteAction(data)),
  })
)(MotionContainer);
