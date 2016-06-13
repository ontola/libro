// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { MotionsList } from '../components';
import { apiGetMotions } from '../actions/motions';

const mapStateToProps = (state) => {
  return {
    data: state.motions.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: dispatch(apiGetMotions()),
  }
}

const MotionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionsList)

export default MotionsContainer;
