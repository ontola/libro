import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { attributeListTopology } from '../../topologies/AttributeList';

const EmploymentAttributeListItem = ({ image }) => (
  <React.Fragment>
    <LinkedResourceContainer subject={image}>
      <Property label={NS.ontola('imgUrl568x400')} />
    </LinkedResourceContainer>
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
