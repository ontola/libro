import RDFTypes from '@rdfdev/prop-types';
import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, subjectType } from 'link-redux';
import React, { PureComponent } from 'react';

import { CoverImage } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

class ImageObjectBackgroundCover extends PureComponent {
  static propTypes = {
    imagePositionY: RDFTypes.literal,
    subject: subjectType,
    url: RDFTypes.namedNode.isRequired,
  };

  render() {
    const {
      imagePositionY,
      subject,
      url,
    } = this.props;

    if (!url) {
      handle(new Error(`Image '${subject}' has no url`));

      return null;
    }

    return (
      <CoverImage
        data-test="ImageObject-cover"
        positionY={tryParseInt(imagePositionY)}
        url={url.value}
      />
    );
  }
}

export default [
  LinkedRenderStore.registerRenderer(
    link({
      imagePositionY: ontola.imagePositionY,
      url: NS.ontola('imgUrl1500x2000'),
    })(ImageObjectBackgroundCover),
    schema.ImageObject,
    RENDER_CLASS_NAME,
    primaryResourceTopology
  ),
  LinkedRenderStore.registerRenderer(
    link({
      imagePositionY: ontola.imagePositionY,
      url: NS.ontola('imgUrl568x400'),
    })(ImageObjectBackgroundCover),
    schema.ImageObject,
    RENDER_CLASS_NAME,
    [
      cardTopology,
      cardFixedTopology,
      cardMainTopology,
    ]
  ),
];
