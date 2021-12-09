import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { semanticColors } from '../shared/config';

import './Heading.scss';

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

/* eslint-disable @typescript-eslint/no-magic-numbers */
const useStyles = makeStyles<LibroTheme>((theme) => ({
  [HeadingVariant.Alert]: {
    color: theme.palette.error.dark,
  },
  [HeadingVariant.Error]: {},
  [HeadingVariant.Motion]: {},
  [HeadingVariant.Navbar]: {
    color: theme.appBar.resolveColor(),
  },
  [HeadingVariant.Notice]: {
    color: theme.palette.grey[600],
    fontStyle: 'italic',
  },
  [HeadingVariant.Question]: {},
  [HeadingVariant.Semantic]: Object.entries(semanticColors).reduce((acc, [k, v]) => ({
    ...acc,
    [`&[typeof='${k}']`]: {
      color: v,
    },
  }), {
    color: theme.palette.link?.header,
  }),
  default: {
    '& b': {
      color: theme.palette.grey[900],
    },
    'color': theme.palette.grey[800],
    'lineHeight': 1.3,
    'marginBottom': '.6rem',
  },
  inherit: {
    display: 'inherit',
  },
}));
/* eslint-enable @typescript-eslint/no-magic-numbers */

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
    Heading: true,
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
