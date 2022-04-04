import { register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SignInFormLink } from '../../components/SignInForm';
import { NavbarLinkLink } from '../../components/NavbarLink';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies';

const GuestUserNavbar = () => {
  const label = (
    <FormattedMessage
      defaultMessage="Log in / sign up"
      description="Link to the page for signing in or registering"
      id="https://app.argu.co/i18n/auth/newSessionLink"
    />
  );

  return (
    <React.Fragment>
      <SignInFormLink
        Component={NavbarLinkLink}
        label={label}
      />
    </React.Fragment>
  );
};

GuestUserNavbar.type = ontola.GuestUser;

GuestUserNavbar.topology = navbarTopology;

export default register(GuestUserNavbar);
