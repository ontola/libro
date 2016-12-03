import React, { PropTypes } from 'react';
import path from 'helpers/paths';
import './BottomBar.scss';
import { checkLuminance } from 'helpers/color';

import {
  BottomBarButton,
} from 'components';

const propTypes = {
  orgColor: PropTypes.string,
  onOpen: PropTypes.func,
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
    <div style={style} className={classNames}>
      <BottomBarButton
        icon="bars"
        isIndex
        label="Menu"
        onClick={onOpen}
      />
      <BottomBarButton
        icon="th-large"
        isIndex
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
