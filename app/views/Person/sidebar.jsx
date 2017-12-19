import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  LDLink,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';
import './properties/name';
import SideBarLinkLabel from '../../components/SideBarLink/SideBarLinkLabel';

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

LinkedRenderStore.registerRenderer(
  CurrentActorSidebar,
  NS.schema('Person'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
