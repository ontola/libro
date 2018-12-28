import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  linkedProp: linkedPropType.isRequired,
};

const HeaderLinkImage = ({ linkedProp }) => (
  <div
    className="HeaderLink__image"
    style={{ backgroundImage: `url(${linkedProp.value})` }}
  />
);

HeaderLinkImage.propTypes = propTypes;

const wrapperPropTypes = {
  children: PropTypes.node,
};

export const HeaderLinkImageWrapper = ({ children }) => (
  <div className="HeaderLink__image-wrapper">{children}</div>
);

HeaderLinkImageWrapper.propTypes = wrapperPropTypes;

export default HeaderLinkImage;
