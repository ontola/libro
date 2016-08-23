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

const defaultButtons = [{
  icon: 'thumbs-up',
  label: 'Ik ben voor',
  side: 'pro',
  action: () => {
    console.log('Gestemd');
  },
}, {
  icon: 'pause',
  label: 'Neutraal',
  side: 'neutral',
  action: () => {
    console.log('Gestemd');
  },
}, {
  icon: 'thumbs-down',
  label: 'Ik ben tegen',
  side: 'con',
  action: () => {
    console.log('Gestemd');
  },
}];

const renderMotion = (data) => (
  <Box
    title={data.title}
    headingSize="3"
    link={`/motions/${data.id}`}
    author={data.creator}
    date={data.createdAt}
    boxActions={defaultButtons}
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
