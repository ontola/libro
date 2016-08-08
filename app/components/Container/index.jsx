// @flow
import './container.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const sizes = [
  'small',
  'medium',
  'large',
];

const propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(sizes),
  spacing: PropTypes.oneOf(sizes),
};

const defaultProps = {
  size: 'medium',
};

const Container = ({ children, size, spacing }) => {
  const containerClassName = classNames({
    Container: true,
    [`Container--size-${size}`]: size,
    [`Container--spacing-${spacing}`]: spacing,
  });

  return (
    <div className={containerClassName}>{children}</div>
  );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
