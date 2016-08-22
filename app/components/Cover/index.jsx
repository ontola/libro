import './Cover.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { shades } from 'components/shared/config';

const propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(shades),
  fixed: PropTypes.bool,
  image: PropTypes.string,
  fullScreen: PropTypes.bool,
};

const defaultProps = {
  backgroundColor: 'transparant',
  children: [],
  type: 'default',
  fixed: false,
  fullScreen: false,
};

/**
 * Building blocks with style
 * @returns {component} Component
 */
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

  const style = {
    backgroundImage: image && `url(${image})`,
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
