import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { mediaQueries } from '../../components/shared/config';
import { NS } from '../../helpers/LinkedRenderStore';
import { NavbarLink } from '../../components';
import path from '../../helpers/paths';
import { navbarTopology } from '../../topologies/Navbar';

const propTypes = {
  redirectURL: PropTypes.string,
};

const GuestUserActor = ({ redirectURL }) => {
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
          <NavbarLink
            icon="sign-in"
            label={matches && label}
            to={path.signIn(redirectURL)}
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
}))(GuestUserActor);

export default LinkedRenderStore.registerRenderer(
  GuestUserActorConnected,
  NS.argu('GuestUser'),
  RENDER_CLASS_NAME,
  navbarTopology
);
