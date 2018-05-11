import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { LinkedResourceContainer, Property, lowLevel, subjectType } from 'link-redux';
import React from 'react';

import { SideBarCollapsible } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import ActorType from './properties/actorType';
import GuestUser from './GuestUser';

const propTypes = {
  subject: subjectType,
};

const CurrentActorFooter = () => (
  <Property label={NS.argu('actor')} />
);

const CurrentActorSidebar = ({ subject }) => (
  <SideBarCollapsible
    id={`${subject}-sidebar-menu`}
    labelComp={<Property label={NS.argu('actor')} />}
  >
    <Property label={NS.argu('actorType')} />
    <LinkedResourceContainer subject={NS.app('menus/user')}>
      <Property label={NS.argu('menuItems')} />
    </LinkedResourceContainer>
  </SideBarCollapsible>
);

CurrentActorSidebar.propTypes = propTypes;

const RegisteredTypes = [NS.argu('ConfirmedUser'), NS.argu('UnconfirmedUser')];
const ActorTypes = [...RegisteredTypes, NS.argu('GuestUser')];

export default [
  LinkedRenderStore.registerRenderer(
    lowLevel.linkedSubject(CurrentActorSidebar),
    RegisteredTypes,
    RENDER_CLASS_NAME,
    NS.argu('sidebar')
  ),
  LinkedRenderStore.registerRenderer(
    lowLevel.linkedSubject(CurrentActorFooter),
    ActorTypes,
    RENDER_CLASS_NAME,
    NS.argu('formFooter')
  ),
  ActorType,
  GuestUser,
];
