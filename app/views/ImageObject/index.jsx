import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React, { PureComponent } from 'react';

import { SideBarLinkImageWrapper } from '../../components/SideBarLink';
import { CoverImage } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import thumbnail from './properties/thumbnail';
import ImageObjectCardList from './ImageObjectCardList';

class ImageObjectCover extends PureComponent {
  static type = NS.schema('ImageObject');

  static topology = [
    undefined,
    NS.argu('card'),
    NS.argu('cardFixed'),
    NS.argu('cardMain'),
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
      NS.argu('detail'),
      NS.argu('dropdownContent'),
      NS.argu('formFooter'),
      NS.argu('header'),
      NS.argu('sidebar'),
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
  ...thumbnail,
  ImageObjectCardList,
];
