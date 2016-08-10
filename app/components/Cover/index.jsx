// @flow
import './cover.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  backgroundColor: PropTypes.string,
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
  backgroundColor: 'transparant',
  children: [],
  type: 'default',
  image: undefined,
  fixed: false,
  fullScreen: false,
};

const Cover = ({
  backgroundColor,
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

  // const imageStyle = image && { backgroundImage: `url(${image})` };
  // const backgroundColorStyle = backgroundColor && { backgroundColor: `${backgroundColor}` };
  const style = {
    backgroundImage: `url(${image})`,
    backgroundColor: `${backgroundColor}`,
  };

  return (
    <section
      className={coverClass}
      style={style}
      children={children}
    />
  );
};

Cover.propTypes = propTypes;
Cover.defaultProps = defaultProps;

export default Cover;
