import React from 'react';
import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/label';
import './MenuSection.scss';

const MenuSection = () => (
  <div>
    <Property label={NS.argu('label')} />
    <Property
      forceRender
      label={NS.argu('menuItems')}
    />
  </div>
);

[NS.argu('sidebar'), NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    MenuSection,
    [NS.argu('MenuSection')],
    RENDER_CLASS_NAME,
    top
  );
});
