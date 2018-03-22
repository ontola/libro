import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './Card.scss';

const defaultProps = {
  alignEnd: false,
  noSpacing: false,
};

const propTypes = {
  alignEnd: PropTypes.bool,
  children: PropTypes.node,
  noSpacing: PropTypes.bool,
};

/**
 * Wrapper component for Card contents
 * @returns {component} Component
 */
const CardContent = ({
  alignEnd,
  children,
  noSpacing,
}) => {
  if (typeof children === 'undefined') {
    return <div />;
  }

  const classes = classNames({
    CardContent: true,
    'CardContent--align-end': alignEnd,
    'CardContent--no-spacing': noSpacing,
  });

  return (
    <div className={classes}>{children}</div>
  );
};

CardContent.propTypes = propTypes;
CardContent.defaultProps = defaultProps;

export default CardContent;
