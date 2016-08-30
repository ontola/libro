import { connect } from 'react-redux';
import { ScoreSheet } from 'components';
import {
  getVoteMatchResults,
  // getVoteMatchScore,
} from 'state/votematch/selectors';

const mapStateToProps = (state) => ({
  resultsPerMotion: getVoteMatchResults(state),
  // score: getVoteMatchScore(state),
});

const ScoreSheetContainer = connect(
  mapStateToProps
)(ScoreSheet);

export default ScoreSheetContainer;
