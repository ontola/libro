import React, { PropTypes } from 'react';

import { checkLuminance } from 'helpers/color';
import path from 'helpers/paths';

import BottomBarButton from '../BottomBarButton';

import './BottomBar.scss';

const propTypes = {
  onOpen: PropTypes.func,
  orgColor: PropTypes.string,
};

const defaultProps = {
  orgColor: 'rgb(71, 86, 104)',
};

const BottomBar = ({
  orgColor,
  onOpen,
}) => {
  const style = {
    backgroundColor: orgColor,
    flex: '1',
  };

  const classNames = [
    'BottomBar',
    checkLuminance(orgColor) ? 'BottomBar--white-text' : 'BottomBar--dark-text',
  ].join(' ');

  return (
    <div className={classNames} style={style}>
      <BottomBarButton
        isIndex
        icon="bars"
        label="Menu"
        onClick={onOpen}
      />
      <BottomBarButton
        isIndex
        icon="th-large"
        label="Overzicht"
        to={path.index()}
      />
      <BottomBarButton
        icon="search"
        label="Zoeken"
        to={path.search()}
      />
    </div>
  );
};

BottomBar.propTypes = propTypes;
BottomBar.defaultProps = defaultProps;

export default BottomBar;
