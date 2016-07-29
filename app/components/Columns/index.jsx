// @flow
import './columns.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Columns = ({ children }) => <div className="Columns">{children}</div>;

Columns.propTypes = propTypes;

export default Columns;
