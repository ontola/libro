import './columns.scss';
import React, { PropTypes } from 'react';

function Columns({ children }) {
  return (
    <div className="cols">{children}</div>
  );
}

Columns.propTypes = {
  children: PropTypes.node.isRequired,
};

Columns.defaultProps = {
  children: [],
};

export default Columns;
