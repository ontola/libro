import { connect } from 'react-redux';
import { MotionsList } from '../components';
import { fetchMotions } from '../actions';
import { dataMotions } from '../data';

const mapStateToProps = (state) => {
  return {
    motions: state.motions
  };
};

const mapDispatchToProps = (dispatch) => {
  return dispatch(fetchMotions(dataMotions));
};

const MotionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionsList);

export default MotionsContainer;
