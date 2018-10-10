import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { SideBarLinkImageWrapper } from '../../components/SideBarLink';
import { NS } from '../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { pageHeaderTopology } from '../../topologies/PageHeader';
import { sidebarTopology } from '../../topologies/Sidebar';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { voteEventSideTopology } from '../../topologies/VoteEventSide';

import ImageObjectCardList from './ImageObjectCardList';
import ImageObjectCover from './ImageObjectCover';
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
    sidebarTopology,
    voteBubbleTopology,
    voteEventSideTopology,
  ];

  static propTypes = {
    // Hover text to display.
    ariaLabel: PropTypes.string,
  };

  render() {
    const { ariaLabel } = this.props;

    return <Property ariaLabel={ariaLabel} label={NS.schema('thumbnail')} />;
  }
}

export default [
  register(ImageObject),
  ...ImageObjectCover,
  LinkedRenderStore.registerRenderer(
    () => (
      <SideBarLinkImageWrapper data-test="ImageObject-sidebar">
        <Property label={NS.schema('thumbnail')} />
      </SideBarLinkImageWrapper>
    ),
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    sidebarTopology
  ),
  ...thumbnail,
  ImageObjectCardList,
];
