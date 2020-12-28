import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { semanticColors } from '../shared/config';

import './Heading.scss';

/* eslint-disable no-magic-numbers */
const useStyles = makeStyles((theme: any) => {
  const style = {
    default: {
      '& b': {
        color: theme.palette.grey[900],
      },
      'color': theme.palette.grey[800],
      'lineHeight': 1.3,
      'marginBottom': '.6rem',
    },
  } as any;
  style.alert = {
    color: theme.palette.error.dark,
  };
  style.inherit = {
    display: 'inherit',
  };
  style.navbar = {
    color: theme.palette.primary.contrastText,
  };
  style.notice = {
    color: theme.palette.grey[600],
    fontStyle: 'italic',
    textAlign: 'center',
  };
  style.semantic = {
    color: theme.palette.link?.header,
  };

  Object.keys(semanticColors).forEach((type) => {
    style.semantic[`&[typeof='${type}']`] = {
      color: semanticColors[type],
    };
  });

  return style;
});
/* eslint-enable no-magic-numbers */

interface PropTypes {
  children: React.ReactNode;
  className?: string;
  display?: 'inherit';
  size: '1' | '2' | '3' | '4' | '5' | '6';
  type?: SomeTerm;
  variant: 'alert' | 'default' | 'error' | 'motion' | 'navbar' | 'notice' | 'question' | 'semantic';
}

const defaultProps = {
  size: '2',
};

const Heading = ({
  children,
  className,
  display,
  size,
  type,
  variant,
}: PropTypes) => {
  const Element = `h${size}` as React.ElementType;
  const classes = useStyles() as any;
  const headingClass = classNames({
    Heading: true,
    [className ? className : '']: true,
    [classes.default]: true,
    [classes.inherit]: display === 'inherit',
    [classes[variant]]: true,
  });

  return (
    <Element className={headingClass} role="heading" typeof={type}>{children}</Element>
  );
};

Heading.defaultProps = defaultProps;

export default Heading;
