import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { toggleDrawer } from 'state/search/actions';
import { Drawer } from 'components';

const propTypes = {
  visible: PropTypes.bool,
  hits: PropTypes.number,
  onClickToggle: PropTypes.func,
};

const mapStateToProps = (state) => ({
  visible: state.getIn(['search', 'visible']),
  hits: state.getIn(['search', 'hits']),
});

const mapDispatchToProps = (dispatch) => ({
  onClickToggle: () => {
    dispatch(toggleDrawer());
  },
});

const DrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);

DrawerContainer.propTypes = propTypes;

export default DrawerContainer;
