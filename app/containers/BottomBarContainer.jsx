import React from 'react';
import { connect } from 'react-redux';

import {
  openSideBar,
} from '../state/sideBars/actions';
import {
  getSideBarColor,
} from '../state/sideBars/selectors';
import { BottomBar } from '../components';

const BottomBarContainer = props => <BottomBar {...props} />;

export default connect(
  state => ({
    orgColor: getSideBarColor(state),
  }),
  dispatch => ({
    onOpen: () => dispatch(openSideBar('Navbar')),
  })
)(BottomBarContainer);
