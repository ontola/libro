// @flow
import { connect } from 'react-redux';
import { MotionsList } from '../components';
import { getMotions } from '../actions/entities';

const mapStateToProps = (state) => ({
  motions: state.entities.motion,
});

const mapDispatchToProps = (dispatch) => ({
  actions: dispatch(getMotions()),
});

const MotionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionsList);

export default MotionsContainer;
