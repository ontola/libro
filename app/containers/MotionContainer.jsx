import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { MotionShow } from 'components';
import Motion from 'models/Motion';
import { getMotion, getVoteByMotionId } from 'state/motions/selectors';
import { voteAction } from 'state/motions/actions';
import { voteMatchNext } from 'state/votematch/actions';

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  loadMotion: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  onNextMotion: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  voteData: PropTypes.string,
};

const defaultProps = {
  renderItem: MotionShow,
};

class MotionContainer extends Component {
  componentWillMount() {
    const { data, loadMotion, motionId } = this.props;

    if (data === undefined) {
      loadMotion(motionId);
    }
  }

  render() {
    const { data, onNextMotion, renderItem, onVote, voteData } = this.props;
    const RenderComponent = renderItem;

    if (!data) {
      return false;
    }

    return (
      <RenderComponent
        author={data.creator}
        children={data.text}
        date={data.createdAt}
        id={data.id}
        link={`/motions/${data.id}`}
        onVoteAction={onVote}
        onNextMotion={onNextMotion}
        title={data.title}
        type={data.classification}
        voteData={voteData}
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
