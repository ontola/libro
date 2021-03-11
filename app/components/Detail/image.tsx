import { SomeTerm } from '@ontologies/core';
import React from 'react';

export interface DetailImageProps {
  linkedProp: SomeTerm;
  title?: string;
}

const DetailImage = ({ linkedProp, title }: DetailImageProps): JSX.Element => linkedProp && (
  <img
    alt={title}
    className="Detail__image"
    data-test="Detail-image"
    src={linkedProp.value}
  />
);

export default DetailImage;
