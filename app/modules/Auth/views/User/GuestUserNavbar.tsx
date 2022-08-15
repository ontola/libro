import { register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import ontola from '../../../Kernel/ontology/ontola';
import { NavbarLinkLink } from '../../../NavBar/components/NavbarLink';
import { navbarTopology } from '../../../NavBar/topologies';
import { SignInFormLink } from '../../components/SignInForm';
import { authMessages } from '../../lib/messages';

const GuestUserNavbar = () => {
  const label = (
    <FormattedMessage {...authMessages.newSessionLink} />
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
