import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NavbarLinkImageWrapper } from '../../components/NavbarLink';
import { NS } from '../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { menuTopology } from '../../topologies/Menu';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { navbarTopology } from '../../topologies/Navbar';
import { pageHeaderTopology } from '../../topologies/PageHeader';
import { tableCellTopology } from '../../topologies/TableCell';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { voteEventSideTopology } from '../../topologies/VoteEventSide';
import { parentTopology } from '../../topologies/Parent';
import { selectTopology } from '../../topologies/Select';

import ImageObjectCardContent from './ImageObjectCardContent';
import ImageObjectCardList from './ImageObjectCardList';
import ImageObjectCover from './ImageObjectCover';
import ImageObjectPageHeader from './ImageObjectPageHeader';
import boxImage from './properties/boxImage';
import thumbnail from './properties/thumbnail';

const ImageObject = ({ ariaLabel }) => (
  <Property ariaLabel={ariaLabel} label={[schema.thumbnail, NS.ontola('imgUrl64x64')]} />
);

ImageObject.type = [
  schema.ImageObject,
  schema.VideoObject,
];

ImageObject.topology = [
  detailsBarTopology,
  menuTopology,
  formFooterTopology,
  pageHeaderTopology,
  parentTopology,
  tableCellTopology,
  navbarTopology,
  selectTopology,
  voteBubbleTopology,
  voteEventSideTopology,
];

ImageObject.propTypes = {
  // Hover text to display.
  ariaLabel: PropTypes.string,
};

export default [
  register(ImageObject),
  ...ImageObjectCover,
  ImageObjectPageHeader,
  LinkedRenderStore.registerRenderer(
    () => (
      <NavbarLinkImageWrapper data-test="ImageObject-navbar">
        <Property label={NS.ontola('imgUrl568x400')} />
      </NavbarLinkImageWrapper>
    ),
    schema.ImageObject,
    RENDER_CLASS_NAME,
    navbarTopology
  ),
  ...boxImage,
  ...thumbnail,
  ImageObjectCardContent,
  ImageObjectCardList,
];
