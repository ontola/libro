import './drawer.scss';
import { connect } from 'react-redux';
import { toggleDrawer } from '../../state/search/actions';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Button } from '../';

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  hits: PropTypes.number,
  onClickToggle: PropTypes.func,
};

const mapStateToProps = (state) => ({
  visible: state.search.visible,
  hits: state.search.hits,
});

const mapDispatchToProps = (dispatch) => ({
  onClickToggle: () => {
    dispatch(toggleDrawer());
  },
});

const Drawer = ({ children, visible, hits, onClickToggle }) => {
  const drawerClass = classNames({
    'sk-sidebar': true,
    'sk-sidebar--visible': visible,
  });

  return (
    <div className={drawerClass}>
      <div className="sk-sidebar__overlay" onClick={() => { onClickToggle(); }}></div>
      <div className="sk-sidebar__wrapper">
        <div className="sk-sidebar__container">{children}</div>
        <div className="sk-drawer-action sk-drawer-action--close">
          <Button onClick={() => { onClickToggle(); }}>Toon {hits} resultaten</Button>
        </div>
      </div>
    </div>
  );
};

Drawer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
