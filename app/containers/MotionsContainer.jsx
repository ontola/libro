// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, MotionsListItem } from '../components';
import MotionContainer from '../containers/MotionContainer';
import Motion from '../models/Motion';

const propTypes = {
  motions: PropTypes.object,
  loadMotions: PropTypes.func.isRequired,
};

const defaultProps = {
  motions: {},
};

const renderMotion = (data) => (
  <MotionsListItem
    key={data.id}
    motion={data}
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
    motions: state.getIn(['motions', 'items']),
  }),
  dispatch => ({
    loadMotions: () => { dispatch(Motion.index()); },
  })
)(MotionsContainer);
