import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { isDifferentOrigin } from '../../helpers/iris';

import './NavbarLink.scss';
import NavbarLinkCount from './NavbarLinkCount';
import NavbarLinkIcon from './NavbarLinkIcon';
import NavbarLinkImage, { NavbarLinkImageWrapper } from './NavbarLinkImage';
import NavbarLinkLabel from './NavbarLinkLabel';
import NavbarLinkLink from './NavbarLinkLink';
import NavbarLinkWrapper from './NavbarLinkWrapper';

class NavbarLink extends React.PureComponent {
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
      <NavbarLinkWrapper bold={bold}>
        <NavbarLinkLink
          exact={isIndex}
          to={to}
          onClick={onClick || closeBarOnClick}
        >
          {presentationIcon && (
            <NavbarLinkIcon>
              <FontAwesome name={presentationIcon} />
            </NavbarLinkIcon>
          )}
          {imageUrl && (
            <NavbarLinkImageWrapper>
              <NavbarLinkImage imageUrl={imageUrl} />
            </NavbarLinkImageWrapper>
          )}
          <NavbarLinkLabel>
            {label}
          </NavbarLinkLabel>
          <NavbarLinkCount count={count} />
        </NavbarLinkLink>
      </NavbarLinkWrapper>
    );
  }
}

export default NavbarLink;
export {
  NavbarLinkIcon,
  NavbarLinkImageWrapper,
  NavbarLinkLink,
  NavbarLinkWrapper,
};