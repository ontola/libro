import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import BottomBar from 'components/BottomBar';
import {
  closeSideBar,
  // dockSideBar,
  // initializeSideBar,
  openSideBar,
  // undockSideBar,
} from 'state/sideBars/actions';
import {
  // getSideBarDocked,
  // getSideBarOpened,
} from 'state/sideBars/selectors';

const propTypes = {
  id: PropTypes.any.isRequired,
  // onInitializeSideBar: PropTypes.func.isRequired,
};

class BottomBarContainer extends Component {
  render() {
    return <BottomBar {...this.props} />;
  }
}

BottomBarContainer.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    // docked: getSideBarDocked(state, ownProps),
    // opened: getSideBarOpened(state, ownProps),
    // opened: true,
  }),
  (dispatch, { id }) => ({
    // onClose: () => dispatch(closeSideBar(id)),
    // onDock: () => dispatch(dockSideBar(id)),
    onOpen: () => dispatch(openSideBar('Navbar')),
    // onUndock: () => dispatch(undockSideBar(id)),
  })
)(BottomBarContainer);
