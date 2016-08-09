// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import Motion from '../models/Motion';
import { voteMatchNext } from '../actions';

const renderMotion = (activeVoteMatch, data, next, showArguments) => (
  <MotionShow
    data={data}
    showArguments={showArguments}
    activeVoteMatch={activeVoteMatch}
    next={next}
  />
);

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  loadMotion: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  next: PropTypes.func.isRequired,
  creator: PropTypes.object,
  renderItem: PropTypes.func.isRequired,
  showArguments: PropTypes.bool,
  activeVoteMatch: PropTypes.bool,
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
    } = this.props;

    if (data) {
      return renderItem(
        activeVoteMatch,
        data,
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
  })
)(MotionContainer);
