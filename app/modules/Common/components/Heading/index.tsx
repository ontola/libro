import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { BreakPoints, LibroTheme } from '../../../../themes/themes';

import { headingContext } from './HeadingContext';

export enum HeadingSize {
  XL = 1,
  LG = 2,
  MD = 3,
  SM = 4,
  XS = 5,
  XXS = 6,
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
    '.MuiDialog-paper > div > &': {
      color: theme.palette.common.white,
    },
    color: theme.palette.grey.midDark,
    lineHeight: 1.3,
    marginBottom: '.6rem',
  },
  [HeadingSize.XL]: {
    fontSize: theme.typography.fontSizes.xxLarge,
    fontWeight: 'bold',
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.down(BreakPoints.Small)]: {
      fontSize: '1.3rem',
    },
  },
  [HeadingSize.LG]: {
    fontSize: theme.typography.fontSizes.xLarge,
    fontWeight: 'bold',
  },
  [HeadingSize.MD]: {
    fontSize: theme.typography.fontSizes.large,
    fontWeight: 'bold',
  },
  [HeadingSize.SM]: {
    fontSize: theme.typography.fontSizes.medium,
    fontWeight: 'bold',
    lineHeight: '1.1em',
  },
  [HeadingSize.XS]: {
    fontSize: theme.typography.fontSizes.small,
  },
  [HeadingSize.XXS]: {
    fontSize: theme.typography.fontSizes.small,
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

export interface HeadingProps {
  className?: string;
  display?: 'inherit';
  size?: HeadingSize;
  type?: string;
  variant?: HeadingVariant;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  display,
  size,
  type,
  variant = '',
}) => {
  const classes = useStyles();
  let level = React.useContext(headingContext);

  if (!level) {
    if (__DEVELOPMENT__) {
      throw new Error(`Wrong heading level: ${level}`);
    }
    else {
      level = 1;
    }
  }

  const Element = `h${level}` as React.ElementType;

  const headingClass = clsx({
    [headingCID]: true,
    [classes.default]: true,
    [classes.inherit]: display === 'inherit',
    [classes[size ?? level]]: true,
    [classes[variant]]: true,
    [className ?? '']: true,
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

export default Heading;
