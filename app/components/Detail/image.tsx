import { SomeTerm } from '@ontologies/core';
import React from 'react';

interface DetailImageProps {
  linkedProp: SomeTerm;
  title?: string;
}

const DetailImage: React.FC<DetailImageProps> = ({ linkedProp, title }) => linkedProp && (
  <img
    alt={title}
    className="Detail__image"
    data-test="Detail-image"
    src={linkedProp.value}
  />
);

export default DetailImage;
