import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { SideBarLinkImageWrapper } from '../../components/SideBarLink';
import { NS } from '../../helpers/LinkedRenderStore';

import thumbnail from './properties/thumbnail';

const ImageObject = () => <Property label={NS.schema('thumbnail')} />;

export default [
  LinkedRenderStore.registerRenderer(
    ImageObject,
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    NS.argu('collection')
  ),
  LinkedRenderStore.registerRenderer(
    ImageObject,
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('collection'),
      NS.argu('detail'),
      NS.argu('sidebarBlock'),
      NS.argu('voteBubble'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    () => (
      <SideBarLinkImageWrapper>
        <Property label={NS.schema('thumbnail')} />
      </SideBarLinkImageWrapper>
    ),
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    [NS.argu('sidebar')]
  ),
  ...thumbnail
];
