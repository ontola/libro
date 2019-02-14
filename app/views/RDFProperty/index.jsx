import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const RDFProperty = ({ name, subject }) => (
  <span>
    <Property label={NS.schema('image')} />
    {name ? name.value : subject.term}
  </span>
);

RDFProperty.type = NS.rdf('Property');
RDFProperty.topology = allTopologies;
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
