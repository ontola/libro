import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { MotionShow } from 'components';
import Motion from 'models/Motion';
import { getMotion } from 'state/motions/selectors';
import { getVoteByMotionId } from 'state/votes/selectors';
import { voteAction } from 'state/votes/actions';
import { voteMatchNext } from 'state/votematch/actions';
import path from 'helpers/paths';

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  onLoadMotion: PropTypes.func.isRequired,
  onNextMotion: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  status: PropTypes.string,
  voteData: PropTypes.string,
  voteMatchActive: PropTypes.bool,
};

const defaultProps = {
  renderItem: MotionShow,
};

class MotionContainer extends Component {
  componentWillMount() {
    if (this.props.data === undefined) {
      this.props.onLoadMotion(this.props.motionId);
    }
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    const RenderComponent = this.props.renderItem;
    const onVoteAction = (side) => {
      const btnActionFunc = this.props.voteMatchActive
        ? this.props.onNextMotion
        : this.props.onVote;

      return btnActionFunc({
        motionId: this.props.data.id,
        side,
      });
    };

    return (
      <RenderComponent
        children={this.props.data.text}
        createdAt={this.props.data.createdAt}
        creator={this.props.data.creator}
        id={this.props.data.id}
        link={path.motion(this.props.data.id)}
        onNextMotion={this.props.onNextMotion}
        onVote={onVoteAction}
        onVoteAction={this.props.onVote}
        status={this.props.status}
        title={this.props.data.title}
        type={this.props.data.classification}
        voteData={this.props.voteData}
      />
    );
  }
}

MotionContainer.propTypes = propTypes;
MotionContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    data: getMotion(state, ownProps),
    voteData: getVoteByMotionId(state, ownProps),
  }),
  (dispatch) => ({
    onLoadMotion: (id) => dispatch(Motion.fetch(id)),
    onNextMotion: (data) => dispatch(voteMatchNext(data)),
    onVote: (data) => dispatch(voteAction(data)),
  })
)(MotionContainer);
