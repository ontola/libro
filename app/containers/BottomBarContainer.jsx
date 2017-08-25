import React from 'react';
import { connect } from 'react-redux';

import {
  openSideBar,
} from 'state/sideBars/actions';

import { BottomBar } from '../components';

const BottomBarContainer = props => <BottomBar {...props} />;

export default connect(
  null,
  dispatch => ({
    onOpen: () => dispatch(openSideBar('Navbar')),
  })
)(BottomBarContainer);
