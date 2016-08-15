// @flow
import './DetailsBar.scss';
import React, { PropTypes } from 'react';

function DetailsBar({ children }) {
  return (
    <div className="DetailsBar">
      {children}
    </div>
  );
}

DetailsBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsBar;
