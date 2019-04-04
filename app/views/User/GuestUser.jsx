import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { lrsType, Property, withLRS } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { mediaQueries } from '../../components/shared/config';
import { SignInFormLink } from '../../components/SignInForm/index';
import { NS } from '../../helpers/LinkedRenderStore';
import NavbarLink from '../../components/NavbarLink';
import path from '../../helpers/paths';
import { navbarTopology } from '../../topologies/Navbar';

const propTypes = {
  lrs: lrsType,
  redirectURL: PropTypes.string,
};

const GuestUserActor = ({ lrs, redirectURL }) => {
  const label = (
    <FormattedMessage
      defaultMessage="Log in / sign up"
      description="Link to the page for signing in or registering"
      id="https://app.argu.co/i18n/auth/newSessionLink"
    />
  );

  return (
    <MediaQuery query={mediaQueries.smallAndAbove}>
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
          <Property label={NS.argu('actorType')} />
        </React.Fragment>
      )}
    </MediaQuery>
  );
};

GuestUserActor.propTypes = propTypes;

const GuestUserActorConnected = connect(() => ({
  redirectURL: window.location.href,
}))(withLRS(GuestUserActor));

export default LinkedRenderStore.registerRenderer(
  GuestUserActorConnected,
  NS.argu('GuestUser'),
  RENDER_CLASS_NAME,
  navbarTopology
);
