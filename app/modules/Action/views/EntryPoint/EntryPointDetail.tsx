import * as schema from '@ontologies/schema';
import { register, useProperty } from 'link-redux';
import React from 'react';

import Detail from '../../../Common/components/Detail';
import { contentDetailsTopology } from '../../../Common/topologies/ContentDetails';
import { detailsBarTopology } from '../../../Common/topologies/DetailsBar';

interface EntryPointDetailProps {
  name: string;
}

const EntryPointDetail = ({ name }: EntryPointDetailProps): JSX.Element => {
  const [image] = useProperty(schema.image);

  const icon = image?.value?.startsWith('fa-')
    ? image.value.slice('fa-'.length)
    : image?.value;

  return (
    <Detail
      icon={icon}
      text={name}
    />
  );
};

EntryPointDetail.type = schema.EntryPoint;

EntryPointDetail.topology = [
  contentDetailsTopology,
  detailsBarTopology,
];

export default register(EntryPointDetail);
