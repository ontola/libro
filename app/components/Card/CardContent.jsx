import { darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '../../topologies/Card/Card.scss';
import { HOVER_COEFFICIENT } from '../Link/ThemeStyles';

const useStyles = makeStyles((theme) => ({
  default: {
    '& a:not(.Button)': {
      color: theme.palette.link.text,
    },
    '& a:not(.Button):hover': {
      color: darken(theme.palette.link.text, HOVER_COEFFICIENT),
    },
  },
}));

const defaultProps = {
  alignEnd: false,
  noSpacing: false,
};

const propTypes = {
  alignEnd: PropTypes.bool,
  centered: PropTypes.bool,
  children: PropTypes.node,
  endSpacing: PropTypes.bool,
  noSpacing: PropTypes.bool,
  noStartSpacing: PropTypes.bool,
  style: PropTypes.shape({}),
};

/**
 * Wrapper component for Card contents
 * @returns {component} Component
 */
const CardContent = ({
  alignEnd,
  centered,
  children,
  endSpacing,
  noStartSpacing,
  noSpacing,
  style,
}) => {
  if (typeof children === 'undefined') {
    return <div />;
  }

  const classes = classNames({
    [useStyles().default]: true,
    CardContent: true,
    'CardContent--align-end': alignEnd,
    'CardContent--centered': centered,
    'CardContent--end-spacing': endSpacing,
    'CardContent--no-spacing': noSpacing,
    'CardContent--no-start-spacing': noStartSpacing,
  });

  return (
    <div className={classes} style={style}>{children}</div>
  );
};

CardContent.propTypes = propTypes;
CardContent.defaultProps = defaultProps;

export default CardContent;
