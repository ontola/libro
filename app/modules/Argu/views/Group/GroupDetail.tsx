import { register, useProperty } from 'link-redux';
import React from 'react';

import Detail from '../../../Common/components/Detail';
import { contentDetailsTopology, detailsBarTopology } from '../../../Common/topologies';
import argu from '../../ontology/argu';

const GroupDetail = (): JSX.Element => {
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
