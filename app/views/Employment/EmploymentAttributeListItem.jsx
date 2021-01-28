import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import { attributeListTopology } from '../../topologies/AttributeList';

const EmploymentAttributeListItem = ({ image }) => (
  <React.Fragment>
    <Resource subject={image}>
      <Property label={ontola.imgUrl568x400} />
    </Resource>
    <Property label={[schema.name, rdfs.label]} />
  </React.Fragment>
);

EmploymentAttributeListItem.type = rivm.Employment;

EmploymentAttributeListItem.topology = [attributeListTopology];

EmploymentAttributeListItem.mapDataToProps = {
  image: schema.image,
  name: schema.name,
};

EmploymentAttributeListItem.propTypes = {
  image: linkType,
};

export default register(EmploymentAttributeListItem);
