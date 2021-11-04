import * as schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, register } from 'link-redux';
import React from 'react';

import { NavbarLinkImageWrapper } from '../../components/NavbarLink';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

import ImageObject from './ImageObject';
import ImageObjectCardMain from './ImageObjectCardMain';
import ImageObjectCardList from './ImageObjectCardList';
import ImageObjectPageHeader from './ImageObjectPageHeader';
import boxImage from './properties/boxImage';
import thumbnail from './properties/thumbnail';

export default [
  register(ImageObject),
  ImageObjectPageHeader,
  LinkedRenderStore.registerRenderer(
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
  ImageObjectCardMain,
  ImageObjectCardList,
];
