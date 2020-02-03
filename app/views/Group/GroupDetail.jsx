import {
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { Detail } from '../../components';
import argu from '../../ontology/argu';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';

const GroupDetail = () => {
  const [name] = useProperty(argu.nameSingular);

  return (
    <Detail
      text={name?.value}
    />
  );
};

GroupDetail.type = argu.Group;

GroupDetail.topology = [contentDetailsTopology, detailsBarTopology];

export default register(GroupDetail);
