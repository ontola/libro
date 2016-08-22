import './Heading.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  variant: PropTypes.oneOf([
    'default',
    'pro',
    'con',
    'light',
    'center',
    'outsideBox',
  ]),
};

const defaultProps = {
  children: '',
  size: '2',
};

const Heading = ({ children, size, variant }) => {
  const Element = `h${size}`;
  const headingClass = classNames({
    Heading: true,
    [`Heading--${variant}`]: variant,
  });

  return (
    <Element
      children={children}
      className={headingClass}
      role="heading"
    />
  );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
