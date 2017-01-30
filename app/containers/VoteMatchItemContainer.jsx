import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { LinkedObjectContainer } from 'link-redux';

import {
  Button,
  Heading,
} from 'components';
import { voteMatchRemoveVoteable } from 'state/voteMatch/actions';

const propTypes = {
  dragHandle: PropTypes.func.isRequired,
  // The ID of the voteable
  item: PropTypes.string.isRequired,
  onRemoveVoteable: PropTypes.func,
};

// Has a weird bug that requires it to be a class instead of arrow function.
class VoteMatchItem extends React.Component { //eslint-disable-line

  render() {
    const {
      dragHandle,
      item,
      onRemoveVoteable,
    } = this.props;

    return (
      <Heading size="3">
        <div
          style={{
            display: 'flex',
          }}
        >
          <span
            style={{
              marginLeft: '1rem',
              marginRight: '1rem',
              cursor: 'move',
              display: 'block',
            }}
          >
            {dragHandle(
              <FontAwesome name="bars" />
            )}
          </span>
          <LinkedObjectContainer object={item} topology="inline" />
          <Button
            icon="times"
            theme="transparant"
            small
            onClick={onRemoveVoteable}
          />
        </div>
      </Heading>
    );
  }
}

VoteMatchItem.propTypes = propTypes;

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemoveVoteable: () => dispatch(voteMatchRemoveVoteable({
    id: 'LocalVoteMatch',
    voteable: ownProps.item,
  })),
});

const VoteMatchItemContainer = connect(
  null,
  mapDispatchToProps
)(VoteMatchItem);

export default VoteMatchItemContainer;
