import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { ComponentRegistration } from 'link-lib';
import { register } from 'link-redux';
import React from 'react';

import FormFooterImage from '../../../components/Form/FooterImage';
import Image, { ImageBaseProps, ImageProps } from '../../../components/Image';
import NavbarLinkImage from '../../../components/NavbarLink/NavbarLinkImage';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { formFooterTopology } from '../../../topologies/FormFooter/Footer';
import { pageTopology } from '../../../topologies/Page';
import { selectedValueTopology } from '../../../topologies/SelectedValue';

const style = {
  height: '100%',
};

export function registerThumbnail<T extends ImageBaseProps = ImageBaseProps>(
  topology: NamedNode | NamedNode[],
  override: (props: T) => JSX.Element,
): Array<ComponentRegistration<React.ComponentType<ImageProps<T>>>> {
  const ImageProp = ({ ariaLabel, linkedProp }: ImageProps<T>): JSX.Element => (
    <Image<T>
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

  return register<ImageProps<T>>(ImageProp);
}

export default [
  registerThumbnail(
    allTopologiesExcept(
      cardListTopology,
      formFooterTopology,
      pageTopology,
      selectedValueTopology,
    ),
    NavbarLinkImage,
  ),
  registerThumbnail(
    [formFooterTopology, selectedValueTopology],
    FormFooterImage,
  ),
];
