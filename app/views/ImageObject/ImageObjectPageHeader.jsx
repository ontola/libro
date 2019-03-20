import { register } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import {
  PageHeaderImage,
  pageHeaderTopology,
} from '../../topologies/PageHeader';

class ImageObjectPageHeader extends PureComponent {
  static type = NS.schema('ImageObject');

  static topology = pageHeaderTopology;

  static mapDataToProps = [
    NS.argu('imgUrl256x256'),
    NS.schema('description'),
  ];

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
