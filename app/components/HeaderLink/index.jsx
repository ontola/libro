import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import CountBubble from '../CountBubble';
import { isDifferentOrigin } from '../../helpers/iris';

import './HeaderLink.scss';
import HeaderLinkIcon from './HeaderLinkIcon';
import HeaderLinkImage, { HeaderLinkImageWrapper } from './HeaderLinkImage';
import HeaderLinkLabel from './HeaderLinkLabel';
import HeaderLinkLink from './HeaderLinkLink';
import HeaderLinkWrapper from './HeaderLinkWrapper';

class HeaderLink extends React.PureComponent {
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
      <HeaderLinkWrapper bold={bold}>
        <HeaderLinkLink
          exact={isIndex}
          to={to}
          onClick={onClick || closeBarOnClick}
        >
          {presentationIcon && (
            <HeaderLinkIcon>
              <FontAwesome name={presentationIcon} />
            </HeaderLinkIcon>
          )}
          {imageUrl && (
            <HeaderLinkImageWrapper>
              <HeaderLinkImage imageUrl={imageUrl} />
            </HeaderLinkImageWrapper>
          )}
          <HeaderLinkLabel>
            {label}
          </HeaderLinkLabel>
          {(count !== undefined && count > 0) && (
            <div className="HeaderLink__count-wrapper">
              <CountBubble count={count} />
            </div>
          )}
        </HeaderLinkLink>
      </HeaderLinkWrapper>
    );
  }
}

export default HeaderLink;
export {
  HeaderLinkIcon,
  HeaderLinkImageWrapper,
  HeaderLinkLink,
  HeaderLinkWrapper,
};
