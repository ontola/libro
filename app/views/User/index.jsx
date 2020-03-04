import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  lrsType,
  withLinkCtx,
} from 'link-redux';
import React from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { navbarTopology } from '../../topologies/Navbar';

import ActorType from './properties/actorType';
import GuestUser from './GuestUser';

const propTypes = {
  lrs: lrsType,
};

const CurrentActorFooter = () => (
  <Property label={ontola.actor} />
);

const UserNavbar = ({ lrs }) => (
  <ResourceBoundary>
    <Property label={ontola.actorType} />
    <Property
      label={ontola.actor}
      onClick={(e) => {
        if (e) {
          e.preventDefault();
        }
        lrs.exec(app.ns('actions/menu/toggle'));
      }}
    />
  </ResourceBoundary>
);

UserNavbar.propTypes = propTypes;

const RegisteredTypes = [ontola.ConfirmedUser, ontola.UnconfirmedUser];
const ActorTypes = [...RegisteredTypes, ontola.GuestUser];

export default [
  LinkedRenderStore.registerRenderer(
    withLinkCtx(UserNavbar),
    RegisteredTypes,
    RENDER_CLASS_NAME,
    navbarTopology
  ),
  LinkedRenderStore.registerRenderer(
    withLinkCtx(CurrentActorFooter),
    ActorTypes,
    RENDER_CLASS_NAME,
    formFooterTopology
  ),
  ActorType,
  GuestUser,
];
