import { isDifferentOrigin } from 'link-lib';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import CountBubble from '../CountBubble';

import './SideBarLink.scss';
import SideBarLinkIcon from './SideBarLinkIcon';
import SideBarLinkImage, { SideBarLinkImageWrapper } from './SideBarLinkImage';
import SideBarLinkLabel from './SideBarLinkLabel';
import SideBarLinkLink from './SideBarLinkLink';
import SideBarLinkWrapper from './SideBarLinkWrapper';

class SideBarLink extends React.PureComponent {
  static propTypes = {
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
    onClick: PropTypes.func,
    to: PropTypes.string,
  };

  render() {
    const {
      bold,
      count,
      label,
      icon,
      imageUrl,
      isIndex,
      closeBarOnClick,
      onClick,
      to,
    } = this.props;

    const presentationIcon = to && isDifferentOrigin(to) ? 'external-link' : icon;

    return (
      <SideBarLinkWrapper bold={bold}>
        <SideBarLinkLink
          exact={isIndex}
          to={to}
          onClick={onClick || closeBarOnClick}
        >
          {presentationIcon && (
            <SideBarLinkIcon>
              <FontAwesome name={presentationIcon} />
            </SideBarLinkIcon>
          )}
          {imageUrl && (
            <SideBarLinkImageWrapper>
              <SideBarLinkImage imageUrl={imageUrl} />
            </SideBarLinkImageWrapper>
          )}
          <SideBarLinkLabel>
            {label}
          </SideBarLinkLabel>
          {(count !== undefined && count > 0) && (
            <div className="SideBarLink__count-wrapper">
              <CountBubble count={count} />
            </div>
          )}
        </SideBarLinkLink>
      </SideBarLinkWrapper>
    );
  }
}

export default SideBarLink;
export {
  SideBarLinkIcon,
  SideBarLinkImageWrapper,
  SideBarLinkLink,
  SideBarLinkWrapper,
};
