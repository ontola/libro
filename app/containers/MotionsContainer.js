import { connect } from 'react-redux';
import { MotionsList } from '../components';
import { fetchMotions } from '../actions/appData';
import { dataMotions } from '../data';

const mapStateToProps = (state) => ({
  motions: state.motions,
});

const mapDispatchToProps = (dispatch) =>
 dispatch(fetchMotions(dataMotions));

const MotionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionsList);

export default MotionsContainer;
