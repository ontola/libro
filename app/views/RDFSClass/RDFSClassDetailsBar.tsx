import { Literal } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import Detail from '../../components/Detail';
import { detailsBarTopology } from '../../topologies/DetailsBar';

interface TypeDetailsBarProps {
  description?: Literal;
  label?: Literal;
}

const RDFSClassDetailsBar: FC<TypeDetailsBarProps> = ({
  description,
  label,
}) => (
  <Detail
    linkedImage
    text={label?.value}
    title={description?.value}
  />
);

RDFSClassDetailsBar.type = rdfs.Class;

RDFSClassDetailsBar.topology = detailsBarTopology;

RDFSClassDetailsBar.mapDataToProps = {
  description: schema.description,
  label: rdfs.label,
};

export default register(RDFSClassDetailsBar);
