import { MotionShow } from '../components';
import { connect } from 'react-redux';
import { setActiveMotion } from '../actions';
import { dataMotions } from '../data';

const mapStateToProps = (state) => {
  return {
    motion: dataMotions[state.activeMotion]
  };
};

const mapDispatchToProps = (dispatch, index) => {
  return dispatch(setActiveMotion(index.params.motionId));
};

const Motion = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionShow);

export default Motion;
