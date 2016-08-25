/* eslint no-console: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Box, List } from 'components';
import MotionContainer from 'containers/MotionContainer';
import Motion from 'models/Motion';
import { getMotions } from 'state/motions/selectors';

const propTypes = {
  motions: PropTypes.object,
  loadMotions: PropTypes.func.isRequired,
};

const defaultProps = {
  motions: {},
};

const defaultButtons = (id, voteAction) => [{
  icon: 'thumbs-up',
  label: 'Ik ben voor',
  side: 'pro',
  action: () => {
    voteAction({
      motionId: id,
      side: 'pro',
    });
  },
}, {
  icon: 'pause',
  label: 'Neutraal',
  side: 'neutral',
  action: () => {
    voteAction({
      motionId: id,
      side: 'neutral',
    });
  },
}, {
  icon: 'thumbs-down',
  label: 'Ik ben tegen',
  side: 'con',
  action: () => {
    voteAction({
      motionId: id,
      side: 'con',
    });
  },
}];

const renderMotion = (data, vote, voteData) => (
  <Box
    title={data.title}
    headingSize="3"
    link={`/motions/${data.id}`}
    author={data.creator}
    date={data.createdAt}
    boxActions={defaultButtons(data.id, vote)}
    voteData={voteData}
  />
);

const renderMotionContainer = (data) => (
  <MotionContainer
    key={data.id}
    motionId={data.id}
    renderItem={renderMotion}
  />
);

class MotionsContainer extends Component {
  componentWillMount() {
    this.props.loadMotions();
  }

  render() {
    const { motions } = this.props;
    return motions.size > 0 && <List renderItem={renderMotionContainer} items={motions} />;
  }
}

MotionsContainer.defaultProps = defaultProps;
MotionsContainer.propTypes = propTypes;

export default connect(
  state => ({
    motions: getMotions(state),
  }),
  dispatch => ({
    loadMotions: () => { dispatch(Motion.index()); },
  })
)(MotionsContainer);
