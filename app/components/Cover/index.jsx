// @flow
import './cover.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'default',
    'lighter',
    'light',
    'dark',
  ]),
  fixed: PropTypes.bool,
  image: PropTypes.string,
  fullScreen: PropTypes.bool,
};

const defaultProps = {
  children: [],
  type: 'default',
  image: undefined,
  fixed: false,
  fullScreen: false,
};

const Cover = ({
  children,
  fixed,
  fullScreen,
  image,
  type,
}) => {
  const coverClass = classNames({
    Cover: true,
    [`Cover--${type}`]: true,
    'Cover--image': image,
    'Cover--fixed': fixed,
    'Cover--fullscreen': fullScreen,
  });

  const bgImage = image && { backgroundImage: `url(${image})` };

  return (
    <section
      className={coverClass}
      style={bgImage}
      children={children}
    />
  );
};

Cover.propTypes = propTypes;
Cover.defaultProps = defaultProps;

export default Cover;
