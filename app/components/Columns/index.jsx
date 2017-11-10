import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { sizes } from 'components/shared/config';

import './Columns.scss';

const propTypes = {
  /** Each child becomes a column. */
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.bool,
  gutter: PropTypes.oneOf(sizes),
  size: PropTypes.oneOf(sizes),
};

const defaultProps = {
  flexBasis: '19em',
  flexGrow: true,
  gutter: 'medium',
};

const Columns = ({
  children,
  flexBasis,
  flexGrow,
  gutter,
  size,
}) => {
  const className = classNames({
    Columns,
    'Columns--flex-grow': flexGrow,
    [`Columns--gutter-${gutter}`]: gutter,
    [`Columns--size-${size}`]: size,
  });

  const renderColumns = children.map((column, i) => (
    <div
      className="Column"
      key={i}
      style={{
        flexBasis,
      }}
    >
      {column}
    </div>
  ));

  return (
    <div className={className}>{renderColumns}</div>
  );
};

Columns.propTypes = propTypes;
Columns.defaultProps = defaultProps;

export default Columns;
