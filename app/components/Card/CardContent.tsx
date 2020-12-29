import { darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '../../topologies/Card/Card.scss';
import { HOVER_COEFFICIENT } from '../Link/ThemeStyles';

const useStyles = makeStyles((theme: any) => ({
  default: {
    '& a:not(.Button):not(.AttachmentPreview)': {
      color: theme.palette.link?.text,
    },
    '& a:not(.Button):not(.AttachmentPreview):hover': {
      color: darken(theme.palette.link?.text || theme.palette.common.black, HOVER_COEFFICIENT),
    },
  },
}));

const defaultProps = {
  alignEnd: false,
  noSpacing: false,
};

interface PropTypes {
  alignEnd?: boolean;
  centered?: boolean;
  endSpacing?: boolean;
  noSpacing?: boolean;
  noStartSpacing?: boolean;
  style?: any;
}

/**
 * Wrapper component for Card contents
 * @returns {component} Component
 */
const CardContent: React.FC<PropTypes> = ({
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
    'CardContent': true,
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

CardContent.defaultProps = defaultProps;

export default CardContent;
