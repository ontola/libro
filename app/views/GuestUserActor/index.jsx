import { RENDER_CLASS_NAME } from 'link-lib';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';
import { SideBarLink } from '../../components';
import path from '../../helpers/paths';

const propTypes = {
  redirectURL: PropTypes.string,
};

const GuestUserActor = ({ redirectURL }) => (
  <SideBarLink
    icon="sign-in"
    label="Log in / registreer"
    to={path.signIn(redirectURL)}
  />
);

GuestUserActor.propTypes = propTypes;

const GuestUserActorConnected = connect(() => ({
  redirectURL: window.location.href,
}))(GuestUserActor);

LinkedRenderStore.registerRenderer(
  GuestUserActorConnected,
  NS.argu('GuestUserActor'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
