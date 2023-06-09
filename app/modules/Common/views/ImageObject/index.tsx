import * as schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, register } from 'link-redux';
import React from 'react';

import ontola from '../../../Kernel/ontology/ontola';
import { NavbarLinkImageWrapper } from '../../../NavBar/components/NavbarLink';
import { navbarTopology } from '../../../NavBar/topologies';

import ImageObject from './ImageObject';
import ImageObjectCardMain from './ImageObjectCardMain';
import ImageObjectList from './ImageObjectList';
import ImageObjectPageHeader from './ImageObjectPageHeader';
import boxImage from './properties/boxImage';
import thumbnail from './properties/thumbnail';

export default [
  ...register(ImageObject),
  ...ImageObjectPageHeader,
  ...LinkedRenderStore.registerRenderer(
    () => (
      <NavbarLinkImageWrapper data-test="ImageObject-navbar">
        <Property label={ontola.imgUrl568x400} />
      </NavbarLinkImageWrapper>
    ),
    schema.ImageObject,
    RENDER_CLASS_NAME,
    navbarTopology,
  ),
  ...boxImage,
  ...thumbnail,
  ...ImageObjectCardMain,
  ...ImageObjectList,
];
