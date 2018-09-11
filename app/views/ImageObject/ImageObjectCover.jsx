import { register } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React, { PureComponent } from 'react';

import { CoverImage } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

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

    if (!url) {
      // TODO: bugsnag
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

export default register(ImageObjectCover);
