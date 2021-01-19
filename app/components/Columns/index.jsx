import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

import Column from '../Column';
import { sizes } from '../shared/config';

import './Columns.scss';

const propTypes = {
  /** Each child becomes a column. */
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.bool,
  gutter: PropTypes.oneOf(sizes),
  size: PropTypes.oneOf(sizes),
};

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
}) => {
  const className = clsx({
    Columns,
    'Columns--flex-grow': flexGrow,
    [`Columns--gutter-${gutter}`]: gutter,
    [`Columns--size-${size}`]: size,
  });

  const normChildren = Array.isArray(children) ? children : [children];
  const renderColumns = normChildren.map((child) => (
    <Column
      flexBasis={flexBasis}
      key={`col-${child.key}`}
    >
      {child}
    </Column>
  ));

  return (
    <div className={className}>{renderColumns}</div>
  );
};

Columns.propTypes = propTypes;
Columns.defaultProps = defaultProps;

export default Columns;
