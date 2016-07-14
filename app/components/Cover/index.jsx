// @flow
import './cover.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'default',
    'lighter',
    'dark',
  ]),
  fixed: PropTypes.bool,
  image: PropTypes.string,
};

const defaultProps = {
  children: [],
  type: 'default',
  image: undefined,
  fixed: false,
};

const Cover = ({ children, type, image, fixed }) => {
  const coverClass = classNames({
    Cover: true,
    [`Cover--${type}`]: true,
    'Cover--image': image,
    'Cover--fixed': fixed,
  });

  const bgImage = image && { backgroundImage: `url(${image})` };

  return (
    <section className={coverClass} style={bgImage}>{children}</section>
  );
};

Cover.propTypes = propTypes;
Cover.defaultProps = defaultProps;

export default Cover;
