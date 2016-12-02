import './Container.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { sizes } from 'components/shared/config';

const propTypes = {
  children: PropTypes.node.isRequired,
  flex: PropTypes.bool,
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
  flex,
  size,
  spacing,
}) => {
  const containerClassName = classNames({
    Container: true,
    'Container--flex': flex,
    [`Container--size-${size}`]: !flex && size,
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
