import React from 'react';

import './Column.scss';

export interface ColumnProps {
  /** Each child becomes a column. */
  children: JSX.Element,
  flexBasis?: string,
}

const defaultProps = {
  flexBasis: '19em',
};

const Column = ({
  children,
  flexBasis,
}: ColumnProps): JSX.Element => (
  <div
    className="Column"
    style={{ flexBasis }}
  >
    {children}
  </div>
);

Column.defaultProps = defaultProps;

export default Column;
