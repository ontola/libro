import schema from '@ontologies/schema';
import { register } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import ontola from '../../ontology/ontola';
import {
  PageHeaderImage,
  pageHeaderTopology,
} from '../../topologies/PageHeader';

class ImageObjectPageHeader extends PureComponent {
  static type = schema.ImageObject;

  static topology = pageHeaderTopology;

  static mapDataToProps = {
    description: schema.description,
    imgUrl256x256: ontola.imgUrl256x256,
  };

  static linkOpts = {
    returnType: 'value',
  };

  static propTypes = {
    description: PropTypes.string,
    imgUrl256x256: PropTypes.string.isRequired,
  };

  render() {
    const { description, imgUrl256x256 } = this.props;

    return (
      <PageHeaderImage
        alt={description}
        src={imgUrl256x256}
      />
    );
  }
}

export default register(ImageObjectPageHeader);
