import './Columns.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { sizes } from 'components/shared/config';

const propTypes = {
  /** Each child becomes a column. */
  children: PropTypes.array.isRequired,
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
    'Columns--flexGrow': flexGrow,
    [`Columns--gutter-${gutter}`]: gutter,
    [`Columns--size-${size}`]: size,
  });

  const renderColumns = children.map((column, i) =>
    <div
      key={i}
      className="Column"
      style={{
        flexBasis,
      }}
    >
      {column}
    </div>
  );

  return (
    <div className={className}>{renderColumns}</div>
  );
};


Columns.propTypes = propTypes;
Columns.defaultProps = defaultProps;

export default Columns;
