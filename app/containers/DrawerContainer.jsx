import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getDrawerVisible, getSearchHits } from 'state/searchElastic/selectors';
import { toggleDrawer } from 'state/searchElastic/actions';

import { Drawer } from '../components';

const propTypes = {
  hits: PropTypes.number,
  onClickToggle: PropTypes.func,
  visible: PropTypes.bool,
};

const DrawerContainer = connect(
  state => ({
    hits: getSearchHits(state),
    visible: getDrawerVisible(state),
  }),
  dispatch => ({
    onClickToggle: () => dispatch(toggleDrawer()),
  })
)(Drawer);

DrawerContainer.propTypes = propTypes;

export default DrawerContainer;
