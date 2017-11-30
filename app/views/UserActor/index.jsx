import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { LinkedObjectContainer, Property, lowLevel, subjectType } from 'link-redux';
import React from 'react';

import {
  SideBarCollapsible
} from '../../components';
import { FRONTEND_URL } from '../../config';
import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  subject: subjectType,
};

const CurrentActor = ({ subject }) => (
  <SideBarCollapsible
    alwaysMountChildren
    id={`${subject}-sidebar-menu`}
    labelComp={<Property label={NS.argu('actor')} />}
  >
    <LinkedObjectContainer object={`${FRONTEND_URL}/menus/user`}>
      <Property label={NS.argu('menuItems')} />
    </LinkedObjectContainer>
  </SideBarCollapsible>
);

CurrentActor.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  lowLevel.linkedSubject(CurrentActor),
  NS.argu('UserActor'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
