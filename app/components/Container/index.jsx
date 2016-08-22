import './Container.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { sizes } from 'components/shared/config';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(sizes),
  spacing: PropTypes.oneOf(sizes),
};

const defaultProps = {
  size: 'medium',
};

/**
 * Centers the content and defines width
 * @returns {component} Container with children
 */
const Container = ({
  children,
  size,
  spacing,
}) => {
  const containerClassName = classNames({
    Container: true,
    [`Container--size-${size}`]: size,
    [`Container--spacing-${spacing}`]: spacing,
  });

  return (
    <div className={containerClassName}>
      {children}
    </div>
  );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
