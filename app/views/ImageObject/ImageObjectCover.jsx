import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React, { PureComponent } from 'react';

import { CoverImage } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

class ImageObjectBackgroundCover extends PureComponent {
  static propTypes = {
    imagePositionY: PropTypes.instanceOf(Literal).isRequired,
    url: PropTypes.instanceOf(NamedNode).isRequired,
  };

  render() {
    const { imagePositionY, url } = this.props;

    if (!url) {
      handle(new Error(`Image ${url} has no imagePositionY`));
      return null;
    }

    return (
      <CoverImage
        data-test="ImageObject-cover"
        positionY={Number.parseInt(imagePositionY, 10)}
        url={url.value}
      />
    );
  }
}

export default [
  LinkedRenderStore.registerRenderer(
    link({
      imagePositionY: NS.argu('imagePositionY'),
      url: NS.argu('imgUrl1500x600'),
    })(ImageObjectBackgroundCover),
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    primaryResourceTopology
  ),
  LinkedRenderStore.registerRenderer(
    link({
      imagePositionY: NS.argu('imagePositionY'),
      url: NS.argu('imgUrl568x400'),
    })(ImageObjectBackgroundCover),
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    [
      cardTopology,
      cardFixedTopology,
      cardMainTopology,
    ]
  ),
];
