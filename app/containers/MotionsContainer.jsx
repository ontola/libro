import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { MotionListItem, List } from 'components';
import { getMotions } from 'state/motions/selectors';

import MotionContainer from 'containers/MotionContainer';
import Motion from 'models/Motion';

const propTypes = {
  motions: PropTypes.object,
  loadMotions: PropTypes.func.isRequired,
};

const defaultProps = {
  motions: {},
};

const renderMotionContainer = (data) => (
  <MotionContainer
    key={data.id}
    motionId={data.id}
    renderItem={MotionListItem}
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
