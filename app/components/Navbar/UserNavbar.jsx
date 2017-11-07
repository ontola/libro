import React, { Component, PropTypes } from 'react';

import Dropdown, {
  DropdownLink,
} from '../Dropdown';

import NavbarWrapper from './NavbarWrapper';

const propTypes = {
  displayName: PropTypes.string,
  shortname: PropTypes.string,
};

const linkItem = (title, url, image) => (
  <DropdownLink
    icon={image}
    url={url}
  >
    {title}
  </DropdownLink>
);

class UserNavbar extends Component {
  childrenRight() {
    const { displayName, shortname } = this.props;
    const profileTrigger = <span className="Navbar__item Navbar__item-text">{displayName}</span>;
    const infoTrigger = <span className="Navbar__item Navbar__item-text">Info</span>;

    return [
      <Dropdown trigger={profileTrigger}>
        {linkItem('Gebruiker weergeven', `/u/${shortname}`, 'user')}
        {linkItem('Profiel bewerken', '/settings?tab=profile', 'pencil')}
        {linkItem('Gebruikersinstellingen', '/settings', 'gear')}
        {linkItem('Mijn concepten', `/u/${shortname}/drafts`, 'pencil-square-o')}
        {linkItem('Organisatiebeheer', `/u/${shortname}/pages`, 'building')}
        {linkItem('Forumbeheer', `/u/${shortname}/forums`, 'group')}
        {linkItem('Uitloggen', '/users/sign_out', 'sign-out')}
      </Dropdown>,
      // <HyperDropdown {...notificationDropdown} />,
      <Dropdown trigger={infoTrigger}>
        {linkItem('Onze visie', '/i/about')}
        {linkItem('Hoe werkt Argu?', '/how_argu_works')}
        {linkItem('Ons team', '/i/team')}
        {linkItem('Argu voor overheden', '/i/governments')}
        {linkItem('Voor belangenbehartigers', '/i/lobby_organizations')}
        {linkItem('Pers \u0026 media', 'https://argu.pr.co')}
        {linkItem('Help \u0026 support', 'https://argu.freshdesk.com/support/home')}
        {linkItem('Contact', '/i/contact')}
      </Dropdown>,
    ];
  }

  render() {
    return (
      <NavbarWrapper
        contentRight={this.childrenRight()}
      />
    );
  }
}

UserNavbar.propTypes = propTypes;

export default UserNavbar;
