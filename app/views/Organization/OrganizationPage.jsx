import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource from '../../topologies/PrimaryResource';

class OrganizationPage extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static topology = pageTopology;

  render() {
    return (
      <PrimaryResource>
        <PageHeader>
          <Property label={NS.schema('name')} />
          <Property label={[NS.schema('description'), NS.rdfs('label')]} />
        </PageHeader>
        <Property label={NS.argu('forums')} />
      </PrimaryResource>
    );
  }
}

export default register(OrganizationPage);
