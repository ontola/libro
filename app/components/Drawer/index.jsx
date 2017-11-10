import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

import './Drawer.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  hits: PropTypes.number,
  onClickToggle: PropTypes.func,
  visible: PropTypes.bool,
};

const Drawer = ({
  children,
  hits,
  onClickToggle,
  visible,
}) => {
  const drawerClass = classNames({
    Drawer: true,
    'Drawer--hide': !visible,
    'Drawer--visible': visible,
  });

  return (
    <div className={drawerClass}>
      <div
        className="Drawer__overlay"
        role="button"
        tabIndex={0}
        onClick={() => onClickToggle()}
      />
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
