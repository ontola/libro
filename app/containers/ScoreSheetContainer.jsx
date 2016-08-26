import { connect } from 'react-redux';
import { ScoreSheet } from 'components';
import {
  getVoteMatchMotions,
  getVoteMatchResults,
  getVoteMatchCompareWithOpinions,
} from 'state/votematch/selectors';

const mapStateToProps = (state) => ({
  results: getVoteMatchResults(state),
  motions: getVoteMatchMotions(state),
  compareWith: getVoteMatchCompareWithOpinions(state),
});

const ScoreSheetContainer = connect(
  mapStateToProps
)(ScoreSheet);

export default ScoreSheetContainer;
