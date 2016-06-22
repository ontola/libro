// @flow
import { connect } from 'react-redux';
import { MotionShow } from '../components';
import { apiGetMotions } from '../actions/motions';
import { updateVoteTally } from '../actions/votes';

const mapStateToProps = (state, ownProps) => {
  const findMotion =
    state.motions.items &&
    state.motions.items.find(m => m.identifier === Number(ownProps.params.motionId));

  return {
    data: findMotion,
    loading: state.motions.loading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: dispatch(apiGetMotions(ownProps.params.motionId)),
  onVote: () => {
    dispatch(updateVoteTally());
  },
});

const MotionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionShow);

export default MotionContainer;
