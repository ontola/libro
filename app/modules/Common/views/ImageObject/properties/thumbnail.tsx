import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { ComponentRegistration } from 'link-lib';
import { register } from 'link-redux';
import React from 'react';

import ontola from '../../../../../ontology/ontola';
import {
  allTopologiesExcept,
  formFooterTopology,
  listTopology,
  pageTopology,
  selectedValueTopology,
} from '../../../../../topologies';
import FormFooterImage from '../../../../Form/components/Form/FooterImage';
import NavbarLinkImage from '../../../../NavBar/components/NavbarLink/NavbarLinkImage';
import Image, { ImageBaseProps, ImageProps } from '../../../components/Image';

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
      listTopology,
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
