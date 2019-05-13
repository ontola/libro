import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { lrsType, Property, withLRS } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router';

import { mediaQueries } from '../../components/shared/config';
import { SignInFormLink } from '../../components/SignInForm/index';
import { NS } from '../../helpers/LinkedRenderStore';
import NavbarLink from '../../components/NavbarLink';
import path, { currentLocation } from '../../helpers/paths';
import { values } from '../../helpers/ssr';
import { navbarTopology } from '../../topologies/Navbar';

const propTypes = {
  location: PropTypes.shape({
    path: PropTypes.string,
  }),
  lrs: lrsType,
};

const GuestUserActor = ({ location, lrs }) => {
  const redirectURL = currentLocation(location);

  const label = (
    <FormattedMessage
      defaultMessage="Log in / sign up"
      description="Link to the page for signing in or registering"
      id="https://app.argu.co/i18n/auth/newSessionLink"
    />
  );

  return (
    <MediaQuery query={mediaQueries.smallAndAbove} values={values}>
      {matches => (
        <React.Fragment>
          <SignInFormLink
            Component={NavbarLink}
            icon="sign-in"
            label={matches && label}
            to={path.signIn(redirectURL)}
            onClick={(e) => {
              e.preventDefault();
              lrs.actions.app.startSignIn(NamedNode.find(path.signIn(redirectURL)));
            }}
          />
          <Property label={NS.ontola('actorType')} />
        </React.Fragment>
      )}
    </MediaQuery>
  );
};

GuestUserActor.propTypes = propTypes;

const GuestUserActorConnected = withRouter(withLRS(GuestUserActor));

export default LinkedRenderStore.registerRenderer(
  GuestUserActorConnected,
  NS.ontola('GuestUser'),
  RENDER_CLASS_NAME,
  navbarTopology
);
