import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../topologies';
import { tableHeaderRowTopology } from '../../topologies/TableHeaderRow';

const RDFProperty = ({ name, subject }) => (
  <span>
    <Property label={NS.schema('image')} />
    {name ? name.value : subject.term}
  </span>
);

RDFProperty.type = NS.rdf('Property');
RDFProperty.topology = allTopologiesExcept(tableHeaderRowTopology);
RDFProperty.mapDataToProps = {
  name: { label: [NS.schema('name'), NS.rdfs('label')] },
};
RDFProperty.propTypes = {
  name: linkType,
  subject: subjectType,
};


export default [
  register(RDFProperty),
];
