// @flow
import { connect } from 'react-redux';
import { MotionsList } from '../components';
import { apiGetMotions } from '../actions/motions';

const mapStateToProps = (state) => ({
  motions: state.motions,
});

const mapDispatchToProps = (dispatch) => ({
  actions: dispatch(apiGetMotions()),
});

const MotionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionsList);

export default MotionsContainer;
