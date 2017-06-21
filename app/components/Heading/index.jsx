import './Heading.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { headingSizes, headingVariants } from 'components/shared/config';

const propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.oneOf('inherit'),
  size: PropTypes.oneOf(headingSizes),
  variant: PropTypes.oneOf(headingVariants),
};

const defaultProps = {
  children: '',
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
