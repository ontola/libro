import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NavbarLinkImageWrapper } from '../../components/NavbarLink';
import { NS } from '../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { navbarTopology } from '../../topologies/Navbar';
import { pageHeaderTopology } from '../../topologies/PageHeader';
import { tableCellTopology } from '../../topologies/TableCell';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { voteEventSideTopology } from '../../topologies/VoteEventSide';
import { parentTopology } from '../../topologies/Parent';

import ImageObjectCardContent from './ImageObjectCardContent';
import ImageObjectCardList from './ImageObjectCardList';
import ImageObjectCover from './ImageObjectCover';
import ImageObjectPageHeader from './ImageObjectPageHeader';
import thumbnail from './properties/thumbnail';

class ImageObject extends React.PureComponent {
  static type = [
    NS.schema('ImageObject'),
    NS.schema('VideoObject'),
  ];

  static topology = [
    detailsBarTopology,
    dropdownContentTopology,
    formFooterTopology,
    pageHeaderTopology,
    parentTopology,
    tableCellTopology,
    navbarTopology,
    voteBubbleTopology,
    voteEventSideTopology,
  ];

  static propTypes = {
    // Hover text to display.
    ariaLabel: PropTypes.string,
  };

  render() {
    const { ariaLabel } = this.props;

    return <Property ariaLabel={ariaLabel} label={[NS.schema('thumbnail'), NS.argu('imgUrl64x64')]} />;
  }
}

export default [
  register(ImageObject),
  ...ImageObjectCover,
  ImageObjectPageHeader,
  LinkedRenderStore.registerRenderer(
    () => (
      <NavbarLinkImageWrapper data-test="ImageObject-navbar">
        <Property label={[NS.schema('thumbnail'), NS.argu('imgUrl64x64')]} />
      </NavbarLinkImageWrapper>
    ),
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    navbarTopology
  ),
  ...thumbnail,
  ImageObjectCardContent,
  ImageObjectCardList,
];
