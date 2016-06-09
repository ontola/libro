// @flow
import './heading.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
};

const defaultProps = {
  children: 'No title specified',
  size: '2',
};

function Heading({ children, size }) {
  const Element = `h${size}`;

  return (
    <Element
      className="heading"
      role="heading"
    >
      {children}
    </Element>
  );
}

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
