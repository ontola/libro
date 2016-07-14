// @flow
import './container.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
};

const defaultProps = {
  children: [],
  size: 'medium',
};

const Container = ({ children, size }) => {
  const containerClassName = classNames({
    Container: true,
    [`Container--${size}`]: true,
  });

  return (
    <div className={containerClassName}>{children}</div>
  );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
