import React from 'react';
import { Property, register } from 'link-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import Container from '../../topologies/Container/index';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';

class ForumPage extends React.PureComponent {
  static type = NS.argu('Forum');

  static topology = [
    undefined,
    pageTopology,
  ];

  render() {
    return (
      <div>
        <PageHeader>
          <Property label={NS.schema('name')} />
          <Property label={[NS.schema('description'), NS.rdfs('label')]} />
        </PageHeader>
        <Container grid>
          <Property label={NS.argu('widgets')} />
        </Container>
      </div>
    );
  }
}

export default register(ForumPage);
