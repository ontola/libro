// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import Motion from '../models/Motion';

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  loadMotion: PropTypes.func.isRequired,
  motionId: PropTypes.string.isRequired,
  creator: PropTypes.object,
};

class MotionContainer extends Component {
  componentWillMount() {
    this.props.loadMotion();
  }

  render() {
    const { data } = this.props;
    return <MotionShow data={data} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const findMotion = state.getIn(['motions', 'items', ownProps.motionId]);

  return {
    data: findMotion,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadMotion: () => {
    dispatch(Motion.fetch(ownProps.motionId));
  },
});

MotionContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionContainer);
