import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Detail,
} from '../components';
import { voteMatchAddVoteable, voteMatchRemoveVoteable } from '../state/voteMatch/actions';
import { isVoteablePresentInVoteMatch } from '../state/voteMatch/selectors';

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
        <Detail icon="times" text="Verwijder uit stemwijzer" />
      </Button>
    );
  }
  return (
    <Button
      plain
      onClick={onAddVoteMatchVoteable}
    >
      <Detail icon="plus" text="Voeg toe aan stemwijzer" />
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
