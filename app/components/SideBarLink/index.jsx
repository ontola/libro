import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import CountBubble from '../CountBubble';

import './SideBarLink.scss';
import SideBarLinkIcon from './SideBarLinkIcon';
import SideBarLinkImage, {
  SideBarLinkImageWrapper
} from './SideBarLinkImage';
import SideBarLinkLabel from './SideBarLinkLabel';
import SideBarLinkLink from './SideBarLinkLink';
import SideBarLinkWrapper from './SideBarLinkWrapper';

const propTypes = {
  bold: PropTypes.bool,
  closeBarOnClick: PropTypes.func,
  count: PropTypes.number,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  // True for links that are leveled higher than others
  isIndex: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  to: PropTypes.string,
};

const SideBarLink = ({
  bold,
  count,
  label,
  icon,
  imageUrl,
  isIndex,
  closeBarOnClick,
  to,
}) => (
  <SideBarLinkWrapper bold={bold}>
    <SideBarLinkLink
      onlyActiveOnIndex={isIndex}
      to={to}
      onClick={closeBarOnClick}
    >
      {icon &&
      <SideBarLinkIcon>
        <FontAwesome name={icon} />
      </SideBarLinkIcon>}
      {imageUrl &&
      <SideBarLinkImageWrapper>
        <SideBarLinkImage imageUrl={imageUrl} />
      </SideBarLinkImageWrapper>}
      <SideBarLinkLabel>
        {label}
      </SideBarLinkLabel>
      {(count !== undefined && count > 0) &&
      <div className="SideBarLink__count-wrapper">
        <CountBubble count={count} />
      </div>}
    </SideBarLinkLink>
  </SideBarLinkWrapper>
);

SideBarLink.propTypes = propTypes;

export default SideBarLink;
export {
  SideBarLinkIcon,
  SideBarLinkImageWrapper,
  SideBarLinkLink,
  SideBarLinkWrapper,
};
