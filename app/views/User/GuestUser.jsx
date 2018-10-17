import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { SideBarLink } from '../../components';
import path from '../../helpers/paths';
import { sidebarTopology } from '../../topologies/Sidebar';

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
    <React.Fragment>
      <SideBarLink
        icon="sign-in"
        label={label}
        to={path.signIn(redirectURL)}
      />
      <Property label={NS.argu('actorType')} />
    </React.Fragment>
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
  sidebarTopology
);
