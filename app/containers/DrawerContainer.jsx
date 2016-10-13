import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getSearchHits, getDrawerVisible } from 'state/search/selectors';
import { toggleDrawer } from 'state/search/actions';
import { Drawer } from 'components';

const propTypes = {
  visible: PropTypes.bool,
  hits: PropTypes.number,
  onClickToggle: PropTypes.func,
};

const DrawerContainer = connect(
  state => ({
    visible: getDrawerVisible(state),
    hits: getSearchHits(state),
  }),
  dispatch => ({
    onClickToggle: () => dispatch(toggleDrawer()),
  })
)(Drawer);

DrawerContainer.propTypes = propTypes;

export default DrawerContainer;
