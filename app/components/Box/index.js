import './box.scss';
import React, { PropTypes } from 'react';

function Box({ children }) {
  return (
    <div className="box">{children}</div>
  );
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
};

Box.defaultProps = {
  children: [],
};

export default Box;
