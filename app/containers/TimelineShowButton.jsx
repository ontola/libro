import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components';
import { openSideBar } from '../state/sideBars/actions';
import { getSideBarDocked } from '../state/sideBars/selectors';

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
        small
        icon="comment"
        theme="transparant"
        onClick={onOpen}
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
