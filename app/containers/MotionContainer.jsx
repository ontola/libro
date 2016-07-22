// @flow
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import { Motion } from '../models';

const mapStateToProps = (state, ownProps) => {
  const findMotion = state.getIn(['motions', 'items', ownProps.params.motionId]);

  return {
    data: findMotion,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const motion = new Motion();
  const getMotion = motion.set('id', ownProps.params.motionId).fetch();

  return {
    actions: dispatch(getMotion),
  };
};

const MotionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionShow);

export default MotionContainer;
