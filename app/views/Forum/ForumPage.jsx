import React from 'react';
import { Property, register } from 'link-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container/index';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { LoadingFiller } from '../../components/Loading/index';

class ForumPage extends React.PureComponent {
  static type = [NS.argu('ContainerNode'), NS.schema('WebPage')];

  static topology = [
    primaryResourceTopology,
    pageTopology,
  ];

  render() {
    return (
      <PrimaryResource>
        <PageHeader />
        <Container grid>
          <Property label={NS.ontola('widgets')} onLoad={LoadingFiller} />
        </Container>
      </PrimaryResource>
    );
  }
}

export default register(ForumPage);
