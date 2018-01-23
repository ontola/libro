import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { lowLevel, Property, PropertyBase } from 'link-redux';
import React from 'react';

import { SideBarLinkImageWrapper } from '../../components/SideBarLink';
import { CoverImage } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import thumbnail from './properties/thumbnail';

class ImageObjectCoverComp extends PropertyBase {
  render() {
    const url = this.getLinkedObjectProperty(NS.schema('url')).value;
    if (!url) {
      return null;
    }

    const position = this.getLinkedObjectProperty(NS.argu('imagePositionY')).value;

    return (
      <CoverImage
        data-test="ImageObject-cover"
        positionY={position}
        url={url}
      />
    );
  }
}

const ImageObjectCover = lowLevel.linkedSubject(lowLevel.linkedVersion(ImageObjectCoverComp));

const ImageObject = () => <Property label={NS.schema('thumbnail')} />;

export default [
  LinkedRenderStore.registerRenderer(
    ImageObjectCover,
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('card'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ImageObjectCover,
    NS.schema('ImageObject')
  ),
  LinkedRenderStore.registerRenderer(
    ImageObject,
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    [
      NS.argu('detail'),
      NS.argu('sidebarBlock'),
      NS.argu('voteBubble'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    () => (
      <SideBarLinkImageWrapper data-test="ImageObject-sidebar">
        <Property label={NS.schema('thumbnail')} />
      </SideBarLinkImageWrapper>
    ),
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    [NS.argu('sidebar')]
  ),
  ...thumbnail
];
