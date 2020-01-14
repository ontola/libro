import { Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React from 'react';

import { headingSizes } from '../shared/config';

import './Heading.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(headingSizes),
};

const defaultProps = {
  size: '2',
};

const variantMap = (theme, variant) => {
  switch (variant) {
    case 'motion': return theme.ontola.colors.blue.base;
    case 'pro': return theme.ontola.colors.green.base;
    case 'con': return theme.ontola.colors.brown.base;
    case 'question': return theme.ontola.colors.brown.dark;
    case 'alert': return theme.ontola.colors.red.base;
    default: return theme.palette.primary.light;
  }
};

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    color: variantMap(theme, props?.variant),
  }),
}));

const Heading = (props) => {
  const {
    children,
    size,
  } = props;
  const { root } = useStyles(props);
  const Element = `h${size}`;
  // const headingClass = classNames({
  //   Heading: true,
  //   [`Heading--${variant}`]: variant,
  //   [display === 'inherit' ? 'Heading--inherit' : '']: true,
  // });

  return (
    <Typography
      gutterBottom
      className={root}
      color="inherit"
      variant={Element}
    >
      {children}
    </Typography>
  );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
