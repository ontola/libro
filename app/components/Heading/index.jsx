// @flow
import './heading.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  light: PropTypes.bool,
};

const defaultProps = {
  children: '',
  size: '2',
  light: false,
};

const Heading = ({ children, size, light, className }) => {
  const Element = `h${size}`;

  const headingClass = classNames({
    Heading: true,
    'Heading--light': light,
  });

  return (
    <Element
      className={headingClass + " " + className}
      role="heading"
      children={children}
    />
  );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
