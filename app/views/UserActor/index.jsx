import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { LinkedObjectContainer, Property } from 'link-redux';
import React from 'react';

import {
  SideBarCollapsible
} from '../../components';
import { FRONTEND_URL } from '../../config';
import { NS } from '../../helpers/LinkedRenderStore';

const CurrentActor = () => (
  <SideBarCollapsible
    alwaysMountChildren
    id="CurrentActorNavBar"
    labelComp={<Property label={NS.argu('actor')} />}
  >
    <LinkedObjectContainer object={`${FRONTEND_URL}/menus/user`}>
      <Property label={NS.argu('menuItems')} />
    </LinkedObjectContainer>
  </SideBarCollapsible>
);

export default LinkedRenderStore.registerRenderer(
  CurrentActor,
  NS.argu('UserActor'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
