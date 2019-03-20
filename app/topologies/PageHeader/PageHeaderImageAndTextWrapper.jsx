import PropTypes from 'prop-types';
import React from 'react';

const PageHeaderMenuItems = ({ children }) => (
  <div className="PageHeader__image-and-text-wrapper">
    {children}
  </div>
);

PageHeaderMenuItems.propTypes = {
  children: PropTypes.node,
};

export default PageHeaderMenuItems;
