// @flow
import './detailsBar.scss';
import React, { PropTypes } from 'react';

function DetailsBar({ children }) {
  return (
    <div className="detailsBar">
      {children}
    </div>
  );
}

DetailsBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsBar;
