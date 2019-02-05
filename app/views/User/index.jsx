import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  lrsType,
  Property,
  withLinkCtx,
} from 'link-redux';
import React from 'react';

import { Resource } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { navbarTopology } from '../../topologies/Navbar';

import ActorType from './properties/actorType';
import GuestUser from './GuestUser';

const propTypes = {
  lrs: lrsType,
};

const CurrentActorFooter = () => (
  <Property label={NS.argu('actor')} />
);

const UserNavbar = ({ lrs }) => (
  <Resource>
    <Property label={NS.argu('actorType')} />
    <Property
      label={NS.argu('actor')}
      onClick={(e) => {
        if (e) {
          e.preventDefault();
        }
        lrs.exec(NS.app('actions/menu/toggle'));
      }}
    />
  </Resource>
);

UserNavbar.propTypes = propTypes;

const RegisteredTypes = [NS.argu('ConfirmedUser'), NS.argu('UnconfirmedUser')];
const ActorTypes = [...RegisteredTypes, NS.argu('GuestUser')];

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
