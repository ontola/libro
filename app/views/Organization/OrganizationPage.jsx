import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';

class OrganizationPage extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static topology = [
    primaryResourceTopology,
    pageTopology,
  ];

  render() {
    return (
      <PrimaryResource>
        <PageHeader />
        <Container>
          <Property label={NS.argu('widgets')} />
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(OrganizationPage);
