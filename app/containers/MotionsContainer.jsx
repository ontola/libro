// @flow
import { connect } from 'react-redux';
import { MotionsList } from '../components';
import { apiGetMotions } from '../actions/motions';

const mapStateToProps = (state) => {
  // console.log('container: ', state.motions);
  return {
    motions: state.motions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: dispatch(apiGetMotions(0)),
});

const MotionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionsList);

export default MotionsContainer;
