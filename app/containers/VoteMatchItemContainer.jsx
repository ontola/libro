import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import {
  Button,
  Heading,
} from '../components';
import { voteMatchRemoveVoteable } from '../state/voteMatch/actions';

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
              cursor: 'move',
              display: 'block',
              marginLeft: '1rem',
              marginRight: '1rem',
            }}
          >
            {dragHandle(<FontAwesome name="bars" />)}
          </span>
          <LinkedResourceContainer subject={item} topology="argu:inline" />
          <Button
            small
            icon="times"
            theme="transparant"
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
