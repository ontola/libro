import PropTypes from 'prop-types';
import React from 'react';

import './ScrollContainer.scss';

/** Makes its {children} scrollable if they overflow their parent's boundary */
const ScrollContainer = ({ children }) => (
  <div className="ScrollContainer">
    {children}
  </div>
);

ScrollContainer.propTypes = {
  children: PropTypes.node,
};

export default ScrollContainer;
