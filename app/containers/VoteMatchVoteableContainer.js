import { LinkedResourceContainer } from 'link-redux';
import { connect } from 'react-redux';

import { voteMatchNextMotion } from 'state/voteMatch/actions';

export default connect(
  undefined,
  (dispatch, { next }) => ({
    onVoteCompleted: () => { dispatch(voteMatchNextMotion({ id: next })); },
  })
)(LinkedResourceContainer);
