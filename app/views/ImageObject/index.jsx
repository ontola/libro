import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React, { PureComponent } from 'react';

import { SideBarLinkImageWrapper } from '../../components/SideBarLink';
import { CoverImage } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import thumbnail from './properties/thumbnail';

const propTypes = {
  imagePositionY: PropTypes.instanceOf(Literal).isRequired,
  url: PropTypes.instanceOf(NamedNode).isRequired,
};

class ImageObjectCoverComp extends PureComponent {
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

ImageObjectCoverComp.propTypes = propTypes;

const ImageObjectCover = link([NS.schema('url'), NS.argu('imagePositionY')])(ImageObjectCoverComp);

const ImageObject = ({ ariaLabel }) => <Property ariaLabel={ariaLabel} label={NS.schema('thumbnail')} />;

ImageObject.propTypes = {
  // Hover text to display.
  ariaLabel: PropTypes.string,
};

export default [
  LinkedRenderStore.registerRenderer(
    ImageObjectCover,
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('card'),
      NS.argu('cardFixed'),
      NS.argu('cardMain'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ImageObject,
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    [
      NS.argu('detail'),
      NS.argu('collection'),
      NS.argu('dropdownContent'),
      NS.argu('formFooter'),
      NS.argu('section'),
      NS.argu('sidebarBlock'),
      NS.argu('voteBubble'),
      NS.argu('voteEventSide'),
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
