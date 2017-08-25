import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Button,
} from '../components';
import {
  openSideBar,
} from 'state/sideBars/actions';
import {
  getSideBarDocked,
} from 'state/sideBars/selectors';

const propTypes = {
  docked: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
};

const TimelineShowButton = ({
  docked,
  onOpen,
}) => {
  if (docked === false) {
    return (
      <Button
        onClick={onOpen}
        theme="transparant"
        small
        icon="comment"
      >
        Timeline weergeven
      </Button>
    );
  }
  return null;
};

TimelineShowButton.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    docked: getSideBarDocked(state, ownProps),
  }),
  (dispatch, { id }) => ({
    onOpen: () => dispatch(openSideBar(id)),
  })
)(TimelineShowButton);
