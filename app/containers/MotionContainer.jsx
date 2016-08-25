
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Box } from 'components';
import Motion from 'models/Motion';
import { getMotion, getVoteByMotionId } from 'state/motions/selectors';
import { voteAction } from 'state/motions/actions';
import { voteMatchNext } from 'state/votematch/actions';

const defaultButtons = (id, vote, nextMotion) => {
  const btnActionFunc = nextMotion || vote;
  const btnAction = (side) => btnActionFunc({
    motionId: id,
    side,
  });

  return [{
    icon: 'thumbs-up',
    label: 'Ik ben voor',
    side: 'pro',
    action: () => {
      btnAction('pro');
    },
  }, {
    icon: 'pause',
    label: 'Neutraal',
    side: 'neutral',
    action: () => {
      btnAction('neutral');
    },
  }, {
    icon: 'thumbs-down',
    label: 'Ik ben tegen',
    side: 'con',
    action: () => {
      btnAction('con');
    },
  }];
};


const renderMotion = (data, vote, voteData, nextMotion, showArguments) => (
  <Box
    date={data.createdAt}
    title={data.title}
    headingSize="2"
    link={`/motions/${data.id}`}
    author={data.creator}
    showArguments={showArguments}
    boxActions={defaultButtons(data.id, vote, nextMotion)}
    voteData={voteData}
    showMeta
    type={data.classification}
    children={data.text}
    id={data.id}
  />
);

const propTypes = {
  creator: PropTypes.object,
  data: PropTypes.instanceOf(Motion),
  loadMotion: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  nextMotion: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  showArguments: PropTypes.bool,
  vote: PropTypes.func.isRequired,
  voteData: PropTypes.string,
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
      data,
      nextMotion,
      renderItem,
      showArguments,
      vote,
      voteData,
    } = this.props;

    if (!data) {
      return false;
    }

    return renderItem(data, vote, voteData, nextMotion, showArguments);
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
    loadMotion: (id) => dispatch(Motion.fetch(id)),
    nextMotion: (data) => dispatch(voteMatchNext(data)),
    vote: (data) => dispatch(voteAction(data)),
  })
)(MotionContainer);
