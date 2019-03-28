import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '../../topologies/Card/Card.scss';

const defaultProps = {
  alignEnd: false,
  noSpacing: false,
};

const propTypes = {
  alignEnd: PropTypes.bool,
  children: PropTypes.node,
  endSpacing: PropTypes.bool,
  noSpacing: PropTypes.bool,
  noStartSpacing: PropTypes.bool,
};

/**
 * Wrapper component for Card contents
 * @returns {component} Component
 */
const CardContent = ({
  alignEnd,
  children,
  endSpacing,
  noStartSpacing,
  noSpacing,
}) => {
  if (typeof children === 'undefined') {
    return <div />;
  }

  const classes = classNames({
    CardContent: true,
    'CardContent--align-end': alignEnd,
    'CardContent--end-spacing': endSpacing,
    'CardContent--no-spacing': noSpacing,
    'CardContent--no-start-spacing': noStartSpacing,
  });

  return (
    <div className={classes}>{children}</div>
  );
};

CardContent.propTypes = propTypes;
CardContent.defaultProps = defaultProps;

export default CardContent;
