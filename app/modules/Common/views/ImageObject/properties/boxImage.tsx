import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { register, useStrings } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';
import ontola from '../../../../Kernel/ontology/ontola';
import Image from '../../../components/Image';

interface BoxImageProps {
  linkedProp: Literal;
  style: {
    maxHeight: string;
  };
}

const boxImage = ({ linkedProp, style }: BoxImageProps) => {
  const [ariaLabel] = useStrings([schema.description, schema.caption]);

  return (
    <Image
      ariaLabel={ariaLabel}
      data-test="ImageObject-ImageObjectBox"
      linkedProp={linkedProp}
      style={style}
    />
  );
};

boxImage.type = [schema.ImageObject, schema.VideoObject];

boxImage.topology = allTopologies;

boxImage.property = ontola.imgUrl568x400;

export default register(boxImage);
