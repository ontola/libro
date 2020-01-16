import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { DetailImage, Image } from '../../../components';
import FormFooterImage from '../../../components/Form/FooterImage';
import NavbarLinkImage from '../../../components/NavbarLink/NavbarLinkImage';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { formFooterTopology } from '../../../topologies/FormFooter/Footer';

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
    createThumbnail(NavbarLinkImage),
    [schema.ImageObject, schema.VideoObject],
    [schema.thumbnail, ontola.imgUrl64x64],
    allTopologiesExcept(cardListTopology, detailsBarTopology, formFooterTopology)
  ),
  LinkedRenderStore.registerRenderer(
    createThumbnail(DetailImage),
    [schema.ImageObject, schema.VideoObject],
    [schema.thumbnail, ontola.imgUrl64x64],
    detailsBarTopology
  ),
  LinkedRenderStore.registerRenderer(
    createThumbnail(FormFooterImage),
    [schema.ImageObject, schema.VideoObject],
    [schema.thumbnail, ontola.imgUrl64x64],
    formFooterTopology
  ),
];
