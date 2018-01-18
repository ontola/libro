import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  linkedProp: linkedPropType.isRequired,
};

const SideBarLinkImage = ({ linkedProp }) => (
  <div
    className="SideBarLink__image"
    style={{ backgroundImage: `url(${linkedProp.value})` }}
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
