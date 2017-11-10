import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  closeSideBar,
  dockSideBar,
  initializeSideBar,
  openSideBar,
  undockSideBar,
} from 'state/sideBars/actions';
import {
  getSideBarDocked,
  getSideBarOpened,
} from 'state/sideBars/selectors';

import { SideBar } from '../components';

const propTypes = {
  id: PropTypes.string.isRequired,
  onInitializeSideBar: PropTypes.func.isRequired,
};

class SideBarContainer extends Component {
  componentWillMount() {
    this.props.onInitializeSideBar({
      id: this.props.id,
    });
  }

  render() {
    return <SideBar {...this.props} />;
  }
}

SideBarContainer.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    docked: getSideBarDocked(state, ownProps),
    opened: getSideBarOpened(state, ownProps),
    // opened: true,
  }),
  (dispatch, { id }) => ({
    onClose: () => dispatch(closeSideBar(id)),
    onDock: () => dispatch(dockSideBar(id)),
    onInitializeSideBar: () => dispatch(initializeSideBar({ id })),
    onOpen: () => dispatch(openSideBar(id)),
    onUndock: () => dispatch(undockSideBar(id)),
  })
)(SideBarContainer);
