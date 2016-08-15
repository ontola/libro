import './Drawer.scss';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Button } from 'components';

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  hits: PropTypes.number,
  onClickToggle: PropTypes.func,
};

const Drawer = ({
  children,
  hits,
  onClickToggle,
  visible,
}) => {
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

export default Drawer;
