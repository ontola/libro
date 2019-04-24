import PropTypes from 'prop-types';
import React from 'react';

import './AppMenuGroup.scss';

const AppMenuGroup = ({ children, footer }) => {
  if (!children) {
    return null;
  }

  return (
    <div className={`AppMenuGroup${footer ? ' AppMenuGroup__footer' : ''}`}>
      {children}
    </div>
  );
};

AppMenuGroup.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.bool,
};

export default AppMenuGroup;
