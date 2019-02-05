import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource from '../../topologies/PrimaryResource';

class PersonPage extends React.PureComponent {
  static type = [
    NS.schema('Person'),
    NS.foaf('Person'),
  ];

  static topology = pageTopology;

  render() {
    return (
      <PrimaryResource>
        <PageHeader />
        <Property label={NS.argu('feed')} />
      </PrimaryResource>
    );
  }
}

export default register(PersonPage);
