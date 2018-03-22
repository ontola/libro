import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import SideBarLinkLabel from '../../components/SideBarLink/SideBarLinkLabel';
import { NS } from '../../helpers/LinkedRenderStore';

import './properties/name';

const CurrentActorSidebar = () => (
  <div className="SideBarLink">
    <LDLink>
      <Property label={NS.schema('image')} />
      <SideBarLinkLabel>
        <Property label={NS.schema('name')} />
      </SideBarLinkLabel>
    </LDLink>
  </div>
);

export default LinkedRenderStore.registerRenderer(
  CurrentActorSidebar,
  NS.schema('Person'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
