import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { shades } from '../shared/config';

import './Cover.scss';

const propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
  fullScreen: PropTypes.bool,
  image: PropTypes.string,
  overlayColor: PropTypes.string,
  type: PropTypes.oneOf(shades),
};

const defaultProps = {
  type: 'default',
};

/**
 * Fills its parent with a color or background.
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
    'Cover--fixed': fixed,
    'Cover--fullscreen': fullScreen,
    'Cover--image': image,
  });

  const style = {
    backgroundColor: `${backgroundColor}`,
    backgroundImage: image ? `url(${image})` : 'none',
  };

  return (
    <section
      className={coverClass}
      data-testid="cover"
      style={style}
    >
      {overlayColor && (
        <div
          className="Cover__overlay"
          style={{
            backgroundColor: overlayColor,
          }}
        />
      )}
      <div className="Cover__content">
        {children}
      </div>
    </section>
  );
};

Cover.propTypes = propTypes;
Cover.defaultProps = defaultProps;

export default Cover;
