import PropTypes from 'prop-types';
import React from 'react';

const PageHeaderText = ({ children }) => (
  <div className="PageHeader__text">
    {children}
  </div>
);

PageHeaderText.propTypes = {
  children: PropTypes.node,
};

export default PageHeaderText;
