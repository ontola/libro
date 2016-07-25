// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import Motion from '../models/Motion';

class MotionContainer extends Component {
  componentDidMount() {
    this.props.loadMotion();
  }

  render() {
    return (
      <MotionShow data={this.props.data} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const findMotion = state.getIn(['motions', 'items', ownProps.params.motionId]);
  return {
    data: findMotion,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadMotion: () => {
    dispatch(Motion.fetch(ownProps.params.motionId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionContainer);
