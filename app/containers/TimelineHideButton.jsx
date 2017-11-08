import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { closeSideBar } from 'state/sideBars/actions';
import { getSideBarDocked } from 'state/sideBars/selectors';

import {
  Button,
} from '../components';

const propTypes = {
  docked: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const TimelineHideButton = ({
  docked,
  onClose,
}) => {
  if (docked === false) {
    return (
      <Button
        onClick={onClose}
        theme="transparant"
        small
        icon="arrow-left"
      >
        Terug
      </Button>
    );
  }
  return null;
};

TimelineHideButton.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    docked: getSideBarDocked(state, ownProps),
  }),
  (dispatch, { id }) => ({
    onClose: () => dispatch(closeSideBar(id)),
  })
)(TimelineHideButton);
