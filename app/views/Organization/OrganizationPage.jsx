import {
  linkType,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';

class OrganizationPage extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static topology = [
    primaryResourceTopology,
    pageTopology,
  ];

  static mapDataToProps = [
    NS.foaf('homepage'),
    NS.schema('name'),
  ];

  static propTypes = {
    homepage: linkType,
  };

  render() {
    const { homepage } = this.props;

    if (homepage) {
      return (
        <Property label={NS.foaf('homepage')} />
      );
    }

    return (
      <PrimaryResource>
        <PageHeader />
      </PrimaryResource>
    );
  }
}

export default register(OrganizationPage);
