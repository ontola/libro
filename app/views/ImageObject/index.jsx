import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React, { PureComponent } from 'react';

import { SideBarLinkImageWrapper } from '../../components/SideBarLink';
import { CoverImage } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { pageHeaderTopology } from '../../topologies/PageHeader';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { sidebarTopology } from '../../topologies/Sidebar';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { voteEventSideTopology } from '../../topologies/VoteEventSide';

import thumbnail from './properties/thumbnail';
import ImageObjectCardList from './ImageObjectCardList';

class ImageObjectCover extends PureComponent {
  static type = NS.schema('ImageObject');

  static topology = [
    primaryResourceTopology,
    cardTopology,
    cardFixedTopology,
    cardMainTopology,
  ];

  static mapDataToProps = [
    NS.schema('url'),
    NS.argu('imagePositionY'),
  ];

  static propTypes = {
    imagePositionY: PropTypes.instanceOf(Literal).isRequired,
    url: PropTypes.instanceOf(NamedNode).isRequired,
  };

  render() {
    const { imagePositionY, url } = this.props;
    return (
      <CoverImage
        data-test="ImageObject-cover"
        positionY={Number.parseInt(imagePositionY, 10)}
        url={url.value}
      />
    );
  }
}

const ImageObject = ({ ariaLabel }) => <Property ariaLabel={ariaLabel} label={NS.schema('thumbnail')} />;

ImageObject.propTypes = {
  // Hover text to display.
  ariaLabel: PropTypes.string,
};

export default [
  register(ImageObjectCover),
  LinkedRenderStore.registerRenderer(
    ImageObject,
    [
      NS.schema('ImageObject'),
      NS.schema('VideoObject'),
    ],
    RENDER_CLASS_NAME,
    [
      detailsBarTopology,
      dropdownContentTopology,
      formFooterTopology,
      pageHeaderTopology,
      sidebarTopology,
      voteBubbleTopology,
      voteEventSideTopology,
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
    sidebarTopology
  ),
  ...thumbnail,
  ImageObjectCardList,
];
