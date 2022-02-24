import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export enum HeadingSize {
  XL = 1,
  LG,
  MD,
  SM,
  XS,
}

export enum HeadingVariant {
  Alert = 'alert',
  Default = 'default',
  Error = 'error',
  Motion = 'motion',
  Navbar = 'navbar',
  Notice = 'notice',
  Question = 'question',
  Semantic = 'semantic',
}

export const headingCID = 'CID-Heading';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  default: {
    '& b': {
      color: theme.palette.grey.dark,
    },
    'color': theme.palette.grey.midDark,
    'lineHeight': 1.3,
    'marginBottom': '.6rem',
  },
  heading: {
    '&:is(h1)': {
      fontSize: theme.typography.fontSizes.xxLarge,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.3rem',
      },
    },
    '&:is(h2)': {
      fontSize: theme.typography.fontSizes.xLarge,
      fontWeight: 'bold',
    },
    '&:is(h3)': {
      fontSize: theme.typography.fontSizes.large,
      fontWeight: 'bold',
    },
    '&:is(h4)': {
      fontSize: theme.typography.fontSizes.medium,
      fontWeight: 'bold',
      lineHeight: '1.1em',
    },
    '&:is(h5, h6)': {
      fontSize: theme.typography.fontSizes.small,
    },
    '.MuiDialog-paper > div > &': {
      color: theme.palette.common.white,
    },
  },
  [HeadingVariant.Alert]: {
    color: theme.palette.error.dark,
  },
  [HeadingVariant.Error]: {},
  [HeadingVariant.Motion]: {},
  [HeadingVariant.Navbar]: {
    color: theme.appBar.resolveColor(),
  },
  [HeadingVariant.Notice]: {
    color: theme.palette.grey.main,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  [HeadingVariant.Question]: {},
  [HeadingVariant.Semantic]: Object.entries(theme.semanticColors).reduce((acc, [k, v]) => ({
    ...acc,
    [`&[typeof='${k}']`]: {
      color: v,
    },
  }), {
    color: theme.palette.link?.header,
  }),
  inherit: {
    display: 'inherit',
  },
}));

interface PropTypes {
  className?: string;
  display?: 'inherit';
  size?: HeadingSize;
  type?: string;
  variant?: HeadingVariant;
}

const defaultProps = {
  size: HeadingSize.LG,
};

const Heading: React.FC<PropTypes> = ({
  children,
  className,
  display,
  size,
  type,
  variant = '',
}) => {
  const Element = `h${size}` as React.ElementType;
  const classes = useStyles();
  const headingClass = clsx({
    [headingCID]: true,
    [classes.heading]: true,
    [className ?? '']: true,
    [classes.default]: true,
    [classes.inherit]: display === 'inherit',
    [classes[variant]]: true,
  });

  return (
    <Element
      className={headingClass}
      role="heading"
      typeof={type}
    >
      {children}
    </Element>
  );
};

Heading.defaultProps = defaultProps;

export default Heading;
