import { darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { HOVER_COEFFICIENT } from '../Link/ThemeStyles';

export const cardContentClassIdentifier = 'CID-CardContent';

const PADDING_BLOCK = 4;
const PADDING_INLINE = 6;
const ENDSPACING_BOTTOM_PADDING = 4;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  alignEnd: {
    alignSelf: 'flex-end',
  },
  cardContent: {
    '& a:not(.Button), & a:not(.AttachmentPreview)': {
      color: theme.palette.link?.text,
    },
    '& a:not(.Button):hover, a:not(.AttachmentPreview):hover': {
      color: darken(theme.palette.link?.text || theme.palette.common.black, HOVER_COEFFICIENT),
    },
    '& p a': {
      '&:hover': {
        textDecoration: 'underline',
      },
      fontWeight: 'normal',
      textDecoration: 'underline',
    },
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing(PADDING_BLOCK)} ${theme.spacing(PADDING_INLINE)}`,
    paddingBottom: 0,
    position: 'relative',
    wordBreak: 'break-word',
  },
  centered: {
    '& .Heading': {
      width: '100%',
    },
    textAlign: 'center',
  },
  'endSpacing': {
    paddingBottom: theme.spacing(ENDSPACING_BOTTOM_PADDING),
  },
  noStartSpacing: {
    paddingTop: 0,
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
  const classes = useStyles();

  if (typeof children === 'undefined') {
    return <div />;
  }

  const className = clsx({
    [cardContentClassIdentifier]: true,
    [classes.cardContent]: true,
    [classes.alignEnd]: alignEnd,
    [classes.centered]: centered,
    [classes.endSpacing]: endSpacing,
    [classes.noSpacing]: noSpacing,
    [classes.noStartSpacing]: noStartSpacing,
  });

  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};

CardContent.defaultProps = defaultProps;

export default CardContent;
