import foaf from '@ontologies/foaf';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

class PersonPage extends React.PureComponent {
  static type = [
    schema.Person,
    foaf.Person,
  ];

  static topology = pageTopology;

  render() {
    return (
      <PrimaryResource>
        <Property label={NS.ontola('profileMenu')} />
      </PrimaryResource>
    );
  }
}

export default register(PersonPage);
