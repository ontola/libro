import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { voteMatchAddVoteable, voteMatchRemoveVoteable } from 'state/voteMatch/actions';
import { isVoteablePresentInVoteMatch } from 'state/voteMatch/selectors';

import {
  Button,
  DetailPure,
} from '../components';

const propTypes = {
  onAddVoteMatchVoteable: PropTypes.func.isRequired,
  onRemoveVoteMatchVoteable: PropTypes.func.isRequired,
  presentInCurrentVoteable: PropTypes.bool.isRequired,
};

const VoteMatchAddContainer = ({
  onAddVoteMatchVoteable,
  onRemoveVoteMatchVoteable,
  presentInCurrentVoteable,
}) => {
  if (presentInCurrentVoteable) {
    return (
      <Button
        plain
        onClick={onRemoveVoteMatchVoteable}
      >
        <DetailPure icon="times" text="Verwijder uit stemwijzer" />
      </Button>
    );
  }
  return (
    <Button
      plain
      onClick={onAddVoteMatchVoteable}
    >
      <DetailPure icon="plus" text="Voeg toe aan stemwijzer" />
    </Button>
  );
};

VoteMatchAddContainer.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    presentInCurrentVoteable: isVoteablePresentInVoteMatch(state, { id: 'LocalVoteMatch', voteable: ownProps.id }),
  }),
  (dispatch, ownProps) => ({
    onAddVoteMatchVoteable: () => dispatch(voteMatchAddVoteable({ id: 'LocalVoteMatch', voteable: ownProps.id })),
    onRemoveVoteMatchVoteable: () => dispatch(voteMatchRemoveVoteable({ id: 'LocalVoteMatch', voteable: ownProps.id })),
  })
)(VoteMatchAddContainer);
