import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  linkedProp: linkedPropType.isRequired,
};

const NavbarLinkImage = ({ linkedProp }) => (
  <div
    className="NavbarLink__image"
    style={{ backgroundImage: `url(${linkedProp.value})` }}
  />
);

NavbarLinkImage.propTypes = propTypes;

const wrapperPropTypes = {
  children: PropTypes.node,
};

export const NavbarLinkImageWrapper = ({ children }) => (
  <div className="NavbarLink__image-wrapper">{children}</div>
);

NavbarLinkImageWrapper.propTypes = wrapperPropTypes;

export default NavbarLinkImage;
