import { NamedNode, isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  useDataFetching,
  useLink,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import { NAME_PREDICATES, TEXT_PREDICATES } from '../../helpers/metaData';
import Detail, { DetailProps } from '../Detail';

const mapFieldProps = {
  description: TEXT_PREDICATES,
  image: schema.image,
  name: NAME_PREDICATES,
};

const LDDetail = (props: DetailProps): JSX.Element => {
  const {
    description,
    image,
    name,
  } = useLink(mapFieldProps);
  useDataFetching(isNamedNode(image) ? image : []);
  const [thumbnail] = useResourceProperty(
    isNamedNode(image) ? image : undefined,
    schema.thumbnail,
  ) as NamedNode[];

  const imageUrl = thumbnail || image;

  return (
    <Detail
      imageUrl={imageUrl}
      text={name?.value}
      title={description?.value}
      {...props}
    />
  );
};

export default LDDetail;
