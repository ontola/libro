import { NamedNode } from '@ontologies/core';
import * as owl from '@ontologies/owl';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';

interface LinkedRecordProps {
  sameAs: NamedNode;
}

const LinkedRecord: FC<LinkedRecordProps> = ({
  sameAs,
}) => (
  <Resource subject={sameAs} />
);

LinkedRecord.type = argu.LinkedRecord;

LinkedRecord.topology = allTopologies;

LinkedRecord.mapDataToProps = {
  sameAs: owl.sameAs,
};

export default [
  register(LinkedRecord),
];
