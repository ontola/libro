import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import Resource from '../../components/Resource';
import { NS } from '../../helpers/LinkedRenderStore';
import PageHeader from '../../topologies/PageHeader';

class Organization extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  render() {
    return (
      <Resource>
        <PageHeader>
          <Property label={NS.schema('name')} />
          <Property label={[NS.schema('description'), NS.rdfs('label')]} />
        </PageHeader>
        <Property label={NS.argu('forums')} />
      </Resource>
    );
  }
}

export default register(Organization);
