// @flow
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import { setActiveMotion } from '../actions/activeMotion';
import { dataMotions } from '../data';

const mapStateToProps = (state) => ({
  motion: dataMotions[state.activeMotion],
});

const mapDispatchToProps = (dispatch, index) =>
  dispatch(setActiveMotion(index.params.motionId));

const Motion = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionShow);

export default Motion;
