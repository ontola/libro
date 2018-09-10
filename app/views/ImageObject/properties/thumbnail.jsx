import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { DetailImage, Image } from '../../../components';
import FormFooterImage from '../../../components/Form/FooterImage';
import SideBarLinkImage from '../../../components/SideBarLink/SideBarLinkImage';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';

const propTypes = {
  ariaLabel: PropTypes.string,
  linkedProp: linkedPropType.isRequired,
};

export const createThumbnail = (override) => {
  const ImageProp = ({ ariaLabel, linkedProp }) => (
    <Image
      ariaLabel={ariaLabel}
      data-test="ImageObject-ImageObjectThumbnail"
      linkedProp={linkedProp}
      override={override}
      style={{ height: '100%' }}
    />
  );
  ImageProp.propTypes = propTypes;

  return ImageProp;
};

export default [
  LinkedRenderStore.registerRenderer(
    createThumbnail(SideBarLinkImage),
    [NS.schema('ImageObject'), NS.schema('VideoObject')],
    NS.schema('thumbnail'),
    allTopologiesExcept(NS.argu('cardList'), NS.argu('detail'), NS.argu('formFooter'))
  ),
  LinkedRenderStore.registerRenderer(
    createThumbnail(DetailImage),
    [NS.schema('ImageObject'), NS.schema('VideoObject')],
    NS.schema('thumbnail'),
    NS.argu('detail')
  ),
  LinkedRenderStore.registerRenderer(
    createThumbnail(FormFooterImage),
    [NS.schema('ImageObject'), NS.schema('VideoObject')],
    NS.schema('thumbnail'),
    NS.argu('formFooter')
  ),
];
