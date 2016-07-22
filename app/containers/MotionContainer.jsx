// @flow
import { connect } from 'react-redux';
import { MotionShow } from '../components';

const mapStateToProps = (state, ownProps) => {
  const findMotion =
    state.entities.motion &&
    state.entities.motion.find(m => m.id === ownProps.params.motionId);

  return {
    data: findMotion,
    loading: state.entities.loading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: dispatch(apiGetMotion({
    id: ownProps.params.motionId,
  })),
});

const MotionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionShow);

export default MotionContainer;
