import React from 'react';
import { Property, register } from 'link-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container/index';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';

class ForumPage extends React.PureComponent {
  static type = [NS.argu('ContainerNode')];

  static topology = [
    primaryResourceTopology,
    pageTopology,
  ];

  render() {
    return (
      <PrimaryResource>
        <PageHeader />
        <Container grid>
          <Property label={NS.argu('widgets')} />
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(ForumPage);
