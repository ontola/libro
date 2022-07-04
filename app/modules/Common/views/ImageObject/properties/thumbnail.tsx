import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { ComponentRegistration } from 'link-lib';
import { register } from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../../topologies';
import ontola from '../../../../Kernel/ontology/ontola';
import FormFooterImage from '../../../../Form/components/Form/FooterImage';
import { formFooterTopology } from '../../../../Form/topologies/FormFooter';
import { selectedValueTopology } from '../../../../Form/topologies/SelectedValue';
import NavbarLinkImage from '../../../../NavBar/components/NavbarLink/NavbarLinkImage';
import Image, { ImageBaseProps, ImageProps } from '../../../components/Image';
import { listTopology } from '../../../topologies/List';
import { pageTopology } from '../../../topologies/Page';

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
