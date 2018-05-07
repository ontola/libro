import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { LinkedResourceContainer, Property, lowLevel, subjectType } from 'link-redux';
import React from 'react';

import { SideBarCollapsible } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  subject: subjectType,
};

const CurrentActorFooter = () => (
  <Property label={NS.argu('actor')} />
);

const CurrentActorSidebar = ({ subject }) => (
  <SideBarCollapsible
    alwaysMountChildren
    id={`${subject}-sidebar-menu`}
    labelComp={<Property label={NS.argu('actor')} />}
  >
    <LinkedResourceContainer subject={NS.app('menus/user')}>
      <Property label={NS.argu('menuItems')} />
    </LinkedResourceContainer>
  </SideBarCollapsible>
);

CurrentActorSidebar.propTypes = propTypes;

const ActorTypes = [NS.argu('UserActor'), NS.argu('GuestUserActor')];

export default [
  LinkedRenderStore.registerRenderer(
    lowLevel.linkedSubject(CurrentActorSidebar),
    NS.argu('UserActor'),
    RENDER_CLASS_NAME,
    NS.argu('sidebar')
  ),
  LinkedRenderStore.registerRenderer(
    lowLevel.linkedSubject(CurrentActorFooter),
    ActorTypes,
    RENDER_CLASS_NAME,
    NS.argu('formFooter')
  ),
];
