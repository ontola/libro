import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { LinkedResourceContainer, Property, lowLevel, subjectType } from 'link-redux';
import { NamedNode } from 'rdflib';
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
    <LinkedResourceContainer subject={new NamedNode(`${FRONTEND_URL}/menus/user`)}>
      <Property label={NS.argu('menuItems')} />
    </LinkedResourceContainer>
  </SideBarCollapsible>
);

CurrentActor.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  lowLevel.linkedSubject(CurrentActor),
  NS.argu('UserActor'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
