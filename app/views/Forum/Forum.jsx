import React from 'react';
import { Property, register } from 'link-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { PageHeader } from '../../components';
import Container from '../../components/Container/index';

class ForumPage extends React.PureComponent {
  static type = NS.argu('Forum');

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
