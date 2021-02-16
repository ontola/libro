import { NamedNode, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React, { FunctionComponent } from 'react';

import DetailImage from '../../../components/Detail/image';
import FormFooterImage from '../../../components/Form/FooterImage';
import Image from '../../../components/Image';
import NavbarLinkImage from '../../../components/NavbarLink/NavbarLinkImage';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { formFooterTopology } from '../../../topologies/FormFooter/Footer';
import { pageTopology } from '../../../topologies/Page';
import { selectedValueTopology } from '../../../topologies/SelectedValue';

interface ImageProps {
  ariaLabel?: string;
  linkedProp: SomeTerm;
}

const style = {
  height: '100%',
};

export const registerThumbnail = (topology: NamedNode | NamedNode[], override: FunctionComponent<ImageProps>) => {
  const ImageProp: FC<ImageProps> = ({ ariaLabel, linkedProp }) => (
    <Image
      ariaLabel={ariaLabel}
      data-test="ImageObject-ImageObjectThumbnail"
      linkedProp={linkedProp}
      override={override}
      style={style}
    />
  );

  ImageProp.type = [schema.ImageObject, schema.VideoObject];

  ImageProp.property = [schema.thumbnail, ontola.imgUrl64x64];

  ImageProp.topology = topology;

  return register(ImageProp);
};

export default [
  registerThumbnail(
    allTopologiesExcept(
      cardListTopology,
      detailsBarTopology,
      formFooterTopology,
      pageTopology,
      selectedValueTopology,
    ),
    NavbarLinkImage,
  ),
  registerThumbnail(
    detailsBarTopology,
    DetailImage,
  ),
  registerThumbnail(
    [formFooterTopology, selectedValueTopology],
    FormFooterImage,
  ),
];
