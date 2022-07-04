import { darken } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import CardContentProps from 'prop-types';
import React, { ChildrenProp } from 'react';

import { LibroTheme } from '../../theme/types';
import { headingCID } from '../Heading';
import { HOVER_COEFFICIENT } from '../Link/ThemeStyles';

export const cardContentClassIdentifier = 'CID-CardContent';

const PADDING_BLOCK = 4;
const PADDING_INLINE = 7;
const ENDSPACING_BOTTOM_PADDING = 4;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  alignEnd: {
    alignSelf: 'flex-end',
  },
  cardContent: {
    '& a:not(.Button):not(.AttachmentPreview)': {
      color: theme.palette.link?.text,
    },
    '& a:not(.Button):not(.AttachmentPreview):hover': {
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
    [`& .${headingCID}`]: {
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

interface CardContentProps {
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
const CardContent: React.FC<CardContentProps & ChildrenProp> = ({
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
      data-testid="card-content"
      style={style}
    >
      {children}
    </div>
  );
};

CardContent.defaultProps = defaultProps;

export default CardContent;
