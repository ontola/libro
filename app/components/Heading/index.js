// @flow
import './heading.scss';
import React, { PropTypes } from 'react';

function Heading({ children, size }) {
  const Element = `h${size}`;

  return (
    <Element className="heading">{children}</Element>
  );
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
};

Heading.defaultProps = {
  children: 'No title specified',
  size: '2',
};

export default Heading;
