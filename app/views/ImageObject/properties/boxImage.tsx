import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { register } from 'link-redux';
import React from 'react';

import Image from '../../../components/Image';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

interface BoxImageProps {
  linkedProp: Literal;
  style: {
    maxHeight: string;
  };
}

const boxImage = ({ linkedProp, style }: BoxImageProps) => (
  <Image
    data-test="ImageObject-ImageObjectBox"
    linkedProp={linkedProp}
    style={style}
  />
);

boxImage.type = [schema.ImageObject, schema.VideoObject];

boxImage.topology = allTopologies;

boxImage.property = ontola.imgUrl568x400;

export default register(boxImage);
