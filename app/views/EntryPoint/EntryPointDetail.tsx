import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { register } from 'link-redux';
import React from 'react';

import Detail from '../../components/Detail';
import { contentDetailsTopology } from '../../topologies/ContentDetails/index';
import { detailsBarTopology } from '../../topologies/DetailsBar';

interface EntryPointDetailProps {
  image: SomeTerm;
  name: string;
}

const EntryPointDetail = ({
  image,
  name,
}: EntryPointDetailProps): JSX.Element => {
  const icon = image && image.value.startsWith('fa-') ? image.value.slice('fa-'.length) : image.value;

  return <Detail icon={icon} text={name} />;
};

EntryPointDetail.type = schema.EntryPoint;

EntryPointDetail.topology = [
  contentDetailsTopology,
  detailsBarTopology,
];

EntryPointDetail.mapDataToProps = {
  image: schema.image,
};

export default register(EntryPointDetail);
