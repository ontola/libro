import PropTypes from 'prop-types';
import React from 'react';

import './Column.scss';

const propTypes = {
  /** Each child becomes a column. */
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  flexBasis: PropTypes.string,
  key: PropTypes.string,
};

const defaultProps = {
  flexBasis: '19em',
};

const Column = ({
  children,
  flexBasis,
  key,
}) => (
  <div
    className="Column"
    key={key}
    style={{ flexBasis }}
  >
    {children}
  </div>
);

Column.propTypes = propTypes;
Column.defaultProps = defaultProps;

export default Column;
