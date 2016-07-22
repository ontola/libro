// @flow
import { connect } from 'react-redux';
import { MotionsList } from '../components';
import { Motion } from '../models';

const getMotions = new Motion().index();

const mapStateToProps = (state) => ({
  motions: state.getIn(['motions', 'items']).toArray(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: dispatch(getMotions),
});

const MotionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionsList);

export default MotionsContainer;
