import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  LinkedResourceContainer,
  Property,
  subjectType,
  withLinkCtx,
} from 'link-redux';
import React from 'react';

import { Resource, SideBarCollapsible } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { sidebarTopology } from '../../topologies/Sidebar';

import ActorType from './properties/actorType';
import GuestUser from './GuestUser';

const propTypes = {
  subject: subjectType,
};

const CurrentActorFooter = () => (
  <Property label={NS.argu('actor')} />
);

const CurrentActorSidebar = ({ subject }) => (
  <Resource>
    <SideBarCollapsible
      id={`${subject}-sidebar-menu`}
      labelComp={<Property label={NS.argu('actor')} />}
    >
      <Property label={NS.argu('actorType')} />
      <LinkedResourceContainer subject={NS.app('menus/user')}>
        <Property label={NS.argu('menuItems')} />
      </LinkedResourceContainer>
    </SideBarCollapsible>
  </Resource>
);

CurrentActorSidebar.propTypes = propTypes;

const RegisteredTypes = [NS.argu('ConfirmedUser'), NS.argu('UnconfirmedUser')];
const ActorTypes = [...RegisteredTypes, NS.argu('GuestUser')];

export default [
  LinkedRenderStore.registerRenderer(
    withLinkCtx(CurrentActorSidebar),
    RegisteredTypes,
    RENDER_CLASS_NAME,
    sidebarTopology
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
