import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCard, removeCard } from '../actions/hovercard';
import { Hoverable } from '../components';

const mapStateToProps = (state, ownProps) => {
  return {
    content: ownProps.message,
    id: ownProps.id,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onShow: (content) => {
      dispatch(setCard(content));
    },
  }
}

const HoverContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hoverable)

export default HoverContainer;
