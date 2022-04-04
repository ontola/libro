import {
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Detail from '../../components/Detail';
import argu from '../../ontology/argu';
import { contentDetailsTopology, detailsBarTopology } from '../../topologies';

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
