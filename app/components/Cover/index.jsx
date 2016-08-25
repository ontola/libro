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
  overlayColor: PropTypes.string,
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
  overlayColor,
  image,
  type,
}) => {
  const coverClass = classNames({
    Cover: true,
    [`Cover--${type}`]: true,
    'Cover--image': image,
    'Cover--fixed': fixed,
    'Cover--fullscreen': fullScreen,
    'Cover--hasOverlay': overlayColor,
  });

  const style = {
    backgroundImage: image && `url(${image})`,
    backgroundColor: `${backgroundColor}`,
  };

  return (
    <section
      className={coverClass}
      style={style}
    >
      {overlayColor && <div className="Cover__overlay" style={{ backgroundColor: overlayColor }} />}
      <div className="Cover__content">{children}</div>
    </section>
  );
};

Cover.propTypes = propTypes;
Cover.defaultProps = defaultProps;

export default Cover;
