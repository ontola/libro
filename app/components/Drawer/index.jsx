import './drawer.scss';
import { connect } from 'react-redux';
import { toggleDrawer } from '../../actions/search';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Button } from '../';

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  hits: PropTypes.number,
  toggleDrawer: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {
    visible: state.search.visible,
    hits: state.search.hits,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: () => {
      dispatch(toggleDrawer());
    }
  }
}

class Drawer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { children, visible, hits, toggleDrawer } = this.props;

    const drawerClass = classNames({
      'sk-sidebar': true,
      'sk-sidebar--visible': visible,
    });

    return (
      <div className={drawerClass}>
        <div className="sk-sidebar__overlay" onClick={e => { toggleDrawer(); }}></div>
        <div className="sk-sidebar__wrapper">
          <div className="sk-sidebar__container">{children}</div>
          <div className="sk-drawer-action sk-drawer-action--close">
            <Button onClick={e => { toggleDrawer(); }}>Toon {hits} resultaten</Button>
          </div>
        </div>
      </div>
    );
  }
}

Drawer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
