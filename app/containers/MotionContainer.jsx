import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Motion from 'models/Motion';
import { getMotion } from 'state/motions/selectors';
import { fetchMotion } from 'state/motions/actions';
import { getVoteByMotionId } from 'state/votes/selectors';
import { voteAction } from 'state/votes/actions';
import { voteMatchNext } from 'state/voteMatch/actions';
import path from 'helpers/paths';

import { MotionShow } from '../components';

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  loadMotion: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  onNextMotion: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  renderItem: PropTypes.func,
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
      this.props.loadMotion(this.props.motionId);
    }
  }

  render() {
    const {
      data,
      onNextMotion,
      onVote,
      renderItem,
      status,
      voteData,
      voteMatchActive,
    } = this.props;

    if (!data) {
      return null;
    }

    const RenderComponent = renderItem;

    const onVoteAction = (side) => {
      const btnActionFunc = voteMatchActive ? onNextMotion : onVote;
      return btnActionFunc({
        motionId: data.id,
        side,
      });
    };

    return (
      <RenderComponent
        createdAt={data.createdAt}
        creator={data.creator}
        id={data.id}
        link={path.motion(data.id)}
        status={status}
        text={data.text}
        title={data.title}
        type={data.classification}
        voteData={voteData}
        voteEvents={data.voteEvents}
        onNextMotion={onNextMotion}
        onVote={onVoteAction}
        onVoteAction={onVote}
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
  dispatch => ({
    loadMotion: id => dispatch(fetchMotion(id)),
    onNextMotion: data => dispatch(voteMatchNext(data)),
    onVote: data => dispatch(voteAction(data)),
  })
)(MotionContainer);
