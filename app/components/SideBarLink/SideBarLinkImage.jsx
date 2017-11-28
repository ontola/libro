import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  imageUrl: PropTypes.string,
};

const SideBarLinkImage = ({ imageUrl }) => (
  <div
    className="SideBarLink__image"
    style={{ backgroundImage: `url(${imageUrl})` }}
  />
);

SideBarLinkImage.propTypes = propTypes;

const wrapperPropTypes = {
  children: PropTypes.node,
};

export const SideBarLinkImageWrapper = ({ children }) => (
  <div className="SideBarLink__image-wrapper">{children}</div>
);

SideBarLinkImageWrapper.propTypes = wrapperPropTypes;

export default SideBarLinkImage;
