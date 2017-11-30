import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import Label from './properties/label';
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

export default[
  LinkedRenderStore.registerRenderer(
    MenuSection,
    [NS.argu('MenuSection')],
    RENDER_CLASS_NAME,
    [NS.argu('sidebar'), NS.argu('sidebarBlock')]
  ),
  Label,
];
