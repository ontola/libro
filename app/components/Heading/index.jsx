// @flow
import './heading.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  className: PropTypes.string,
  section: PropTypes.bool,
};

const defaultProps = {
  children: 'No title specified',
  size: '2',
  className: '',
};

function Heading({ children, size, className, section }) {
  const Element = `h${size}`;

  const headingClass = classNames(className, {
    heading: true,
    'heading--section': section,
  });

  return (
    <Element
      className={headingClass}
      role="heading"
      children={children}
    />
  );
}

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
