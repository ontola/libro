import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { Image } from '../../../components';
import SideBarLinkImage from '../../../components/SideBarLink/SideBarLinkImage';
import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType.isRequired,
};

export const ImageObjectThumbnail = ({ linkedProp }) => (
  <Image
    data-test="ImageObject-ImageObjectThumbnail"
    linkedProp={linkedProp}
    override={SideBarLinkImage}
    style={{ height: '100%' }}
  />
);

ImageObjectThumbnail.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    ImageObjectThumbnail,
    NS.schema('ImageObject'),
    NS.schema('thumbnail'),
    allTopologies
  ),
];
