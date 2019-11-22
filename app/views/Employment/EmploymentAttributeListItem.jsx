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
    <Property label={[NS.schema('name'), NS.rdfs('label')]} />
  </React.Fragment>
);

EmploymentAttributeListItem.type = NS.rivm('Employment');

EmploymentAttributeListItem.topology = [attributeListTopology];

EmploymentAttributeListItem.mapDataToProps = {
  image: NS.schema('image'),
  name: NS.schema('name'),
};

EmploymentAttributeListItem.propTypes = {
  image: linkType,
};

export default register(EmploymentAttributeListItem);
