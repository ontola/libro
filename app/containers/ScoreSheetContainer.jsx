import { connect } from 'react-redux';

import { ScoreSheet } from 'components';
import { getVoteMatchResults } from 'state/votematch/selectors';

const mapStateToProps = (state) => ({
  results: getVoteMatchResults(state),
});

const ScoreSheetContainer = connect(
  mapStateToProps
)(ScoreSheet);

export default ScoreSheetContainer;
