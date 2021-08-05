import React from 'react';
import clsx from 'clsx';

import Column from '../Column';
import { Size } from '../shared/config';

import './Columns.scss';

interface ColumnsProps {
  /** Each child becomes a column. */
  children: JSX.Element | JSX.Element[];
  flexBasis?: string;
  flexGrow?: boolean;
  gutter?: Size;
  size?: Size;
}

const defaultProps = {
  flexBasis: '19em',
  flexGrow: true,
  gutter: 'small',
};

const Columns = ({
  children,
  flexBasis,
  flexGrow,
  gutter,
  size,
}: ColumnsProps): JSX.Element => {
  const className = clsx({
    Columns,
    'Columns--flex-grow': flexGrow,
    [`Columns--gutter-${gutter}`]: gutter,
    [`Columns--size-${size}`]: size,
  });

  const normChildren = Array.isArray(children) ? children : [children];
  const renderColumns = normChildren.map((child: JSX.Element) => (
    <Column
      flexBasis={flexBasis}
      key={`col-${child.key}`}
    >
      {child}
    </Column>
  ));

  return (
    <div className={className}>
      {renderColumns}
    </div>
  );
};

Columns.defaultProps = defaultProps;

export default Columns;
