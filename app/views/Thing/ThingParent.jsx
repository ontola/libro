import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { parentTopology } from '../../topologies/Parent';

const ThingParent = ({ name }) => {
  if (!name) {
    return null;
  }

  return (
    <React.Fragment>
      <Property label={schema.isPartOf} />
      <Breadcrumb
        data-test="Thing-parent"
        label={<Property label={[schema.name, as.name]} />}
        title={name.value}
      />
    </React.Fragment>
  );
};

ThingParent.type = schema.Thing;

ThingParent.topology = parentTopology;

ThingParent.mapDataToProps = {
  name: [schema.name, as.name],
};

ThingParent.propTypes = {
  name: linkType,
};

export default register(ThingParent);
