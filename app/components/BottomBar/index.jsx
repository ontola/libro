import React, { PropTypes } from 'react';
import path from 'helpers/paths';
import './BottomBar.scss';
import { checkLuminance } from 'helpers/color';

import {
  BottomBarLink,
} from 'components';

const propTypes = {
  orgColor: PropTypes.string,
};

const defaultProps = {
  orgColor: 'rgb(71, 86, 104)',
};

const BottomBar = ({
  orgColor,
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
      <BottomBarLink
        icon="th-large"
        isIndex
        label="Overzicht"
        to={path.index()}
      />
      <BottomBarLink
        icon="search"
        label="Zoeken"
        to={path.search()}
      />
      <BottomBarLink
        icon="group"
        label="Kamerleden"
        to={path.politiciansIndex()}
      />
      <BottomBarLink
        icon="institution"
        label="Partijen"
        to={path.partiesIndex()}
      />
      <BottomBarLink
        icon="lightbulb-o"
        label="Moties"
        to={path.motionsIndex()}
      />
    </div>
  );
};

BottomBar.propTypes = propTypes;
BottomBar.defaultProps = defaultProps;

export default BottomBar;
