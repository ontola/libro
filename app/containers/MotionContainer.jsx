// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import { apiGetMotions } from '../actions/motions';

const mapStateToProps = (state, ownProps) => {
  const findMotion = state.motions.items && state.motions.items.find(m => m.identifier === Number(ownProps.params.motionId));
  return {
    data: findMotion
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: dispatch(apiGetMotions(ownProps.params.motionId)),
  }
}

const MotionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionShow)

export default MotionContainer
