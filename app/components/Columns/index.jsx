// @flow
import './columns.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  children: [],
};

function Columns({ children }) {
  return (
    <div className="cols">{children}</div>
  );
}

Columns.propTypes = propTypes;
Columns.defaultProps = defaultProps;

export default Columns;
