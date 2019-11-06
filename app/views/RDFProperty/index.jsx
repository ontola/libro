import { term } from '@ontola/mash';
import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../topologies';
import { attributeListTopology } from '../../topologies/AttributeList';
import { tableHeaderRowTopology } from '../../topologies/TableHeaderRow';

import RDFPropertyAttributeList from './RDFPropertyAttributeList';

const RDFProperty = ({ name, subject }) => (
  <span>
    <Property label={NS.schema('image')} />
    {name ? name.value : term(subject)}
  </span>
);

RDFProperty.type = NS.rdf('Property');
RDFProperty.topology = allTopologiesExcept(attributeListTopology, tableHeaderRowTopology);
RDFProperty.mapDataToProps = {
  name: { label: [NS.schema('name'), NS.rdfs('label')] },
};
RDFProperty.propTypes = {
  name: linkType,
  subject: subjectType,
};


export default [
  register(RDFProperty),
  RDFPropertyAttributeList,
];
