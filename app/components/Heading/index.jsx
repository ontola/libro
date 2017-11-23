import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { headingSizes, headingVariants } from '../shared/config';

import './Heading.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.oneOf(['inherit']),
  size: PropTypes.oneOf(headingSizes),
  variant: PropTypes.oneOf(headingVariants),
};

const defaultProps = {
  size: '2',
};

const Heading = ({
  children,
  display,
  size,
  variant,
}) => {
  const Element = `h${size}`;
  const headingClass = classNames({
    Heading: true,
    [`Heading--${variant}`]: variant,
    [display === 'inherit' ? 'Heading--inherit' : null]: true,
  });

  return (
    <Element className={headingClass} role="heading">{children}</Element>
  );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
