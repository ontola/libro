import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  headingSizes,
  headingVariants,
  semanticColors,
} from '../shared/config';

import './Heading.scss';

/* eslint-disable no-magic-numbers */
const useStyles = makeStyles((theme) => {
  const style = {
    default: {
      '& b': {
        color: theme.palette.grey[900],
      },
      color: theme.palette.grey[800],
      lineHeight: 1.3,
      marginBottom: '.6rem',
    },
  };
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

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  display: PropTypes.oneOf(['inherit']),
  size: PropTypes.oneOf(headingSizes),
  type: linkType,
  variant: PropTypes.oneOf(headingVariants),
};

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
}) => {
  const Element = `h${size}`;
  const classes = useStyles();
  const headingClass = classNames({
    Heading: true,
    [className]: true,
    [classes.default]: true,
    [classes.inherit]: display === 'inherit',
    [classes[variant]]: true,
  });

  return (
    <Element className={headingClass} role="heading" typeof={type}>{children}</Element>
  );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
