import React from 'react';
import { connect } from 'react-redux';
import BottomBar from 'components/BottomBar';
import {
  openSideBar,
} from 'state/sideBars/actions';

const BottomBarContainer = props => <BottomBar {...props} />;

export default connect(
  null,
  dispatch => ({
    onOpen: () => dispatch(openSideBar('Navbar')),
  })
)(BottomBarContainer);
