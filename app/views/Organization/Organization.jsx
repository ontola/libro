import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { PageHeader } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

class Organization extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static mapDataToProps = [NS.argu('navigationsMenu')];

  render() {
    return (
      <div>
        <PageHeader>
          <Property label={NS.schema('name')} />
          <Property label={[NS.schema('description'), NS.rdfs('label')]} />
        </PageHeader>
        <Property label={NS.argu('forums')} />
      </div>
    );
  }
}

export default register(Organization);
