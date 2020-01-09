import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { attributeListTopology } from '../../topologies/AttributeList';

const EmploymentAttributeListItem = ({ image }) => (
  <React.Fragment>
    <Resource subject={image}>
      <Property label={NS.ontola('imgUrl568x400')} />
    </Resource>
    <Property label={[schema.name, rdfs.label]} />
  </React.Fragment>
);

EmploymentAttributeListItem.type = NS.rivm('Employment');

EmploymentAttributeListItem.topology = [attributeListTopology];

EmploymentAttributeListItem.mapDataToProps = {
  image: schema.image,
  name: schema.name,
};

EmploymentAttributeListItem.propTypes = {
  image: linkType,
};

export default register(EmploymentAttributeListItem);
