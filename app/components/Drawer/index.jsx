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
    Drawer: true,
    'Drawer--visible': visible,
    'Drawer--hide': !visible,
  });

  return (
    <div className={drawerClass}>
      <div className="Drawer__overlay" onClick={() => onClickToggle()}></div>
      <div className="Drawer__wrapper">
        <div className="Drawer__container">{children}</div>
        <div className="Drawer__action Drawer__action--close">
          <Button onClick={() => onClickToggle()}>Toon {hits} resultaten</Button>
        </div>
      </div>
    </div>
  );
};

Drawer.propTypes = propTypes;

export default Drawer;
