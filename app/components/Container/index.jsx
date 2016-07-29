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
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(sizes),
  spacing: PropTypes.oneOf(sizes),
};

const defaultProps = {
  children: [],
  size: 'medium',
};

const Container = ({ children, size, spacing }) => {
  const containerClassName = classNames({
    Container: true,
    [`Container--size-${size}`]: true,
    [`Container--spacing-${spacing}`]: true,
  });

  return (
    <div className={containerClassName}>{children}</div>
  );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
