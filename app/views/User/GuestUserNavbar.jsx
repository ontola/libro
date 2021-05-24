import rdf from '@ontologies/core';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  lrsType,
  withLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import { SignInFormLink } from '../../components/SignInForm';
import { NavbarLinkLink } from '../../components/NavbarLink';
import path, { currentLocation } from '../../helpers/paths';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

const propTypes = {
  location: PropTypes.shape({
    path: PropTypes.string,
  }),
  lrs: lrsType,
};

const GuestUserNavbar = ({ location, lrs }) => {
  const redirectURL = currentLocation(location).value;

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
        to={path.signIn(redirectURL)}
        onClick={(e) => {
          e.preventDefault();
          lrs.actions.app.startSignIn(rdf.namedNode(redirectURL));
        }}
      />
    </React.Fragment>
  );
};

GuestUserNavbar.propTypes = propTypes;

const GuestUserNavbarConnected = withRouter(withLRS(GuestUserNavbar));

export default LinkedRenderStore.registerRenderer(
  GuestUserNavbarConnected,
  ontola.GuestUser,
  RENDER_CLASS_NAME,
  navbarTopology
);
