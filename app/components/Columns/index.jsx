import './Columns.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { sizes } from 'components/shared/config';

const propTypes = {
  /** Each child becomes a column. */
  children: PropTypes.array.isRequired,
  flexGrow: PropTypes.bool,
  gutter: PropTypes.oneOf(sizes),
};

const defaultProps = {
  flexGrow: true,
  gutter: 'medium',
};

const Columns = ({
  children,
  flexGrow,
  gutter,
}) => {
  const className = classNames({
    Columns,
    'Columns--flexGrow': flexGrow,
    [`Columns--gutter-${gutter}`]: gutter,
  });

  const renderColumns = children.map((column, i) =>
    <div key={i} className="Column">{column}</div>
  );

  return (
    <div className={className}>{renderColumns}</div>
  );
};


Columns.propTypes = propTypes;
Columns.defaultProps = defaultProps;

export default Columns;
