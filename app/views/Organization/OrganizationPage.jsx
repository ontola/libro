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
    NS.argu('primaryContainerNode'),
    NS.schema('name'),
  ];

  static propTypes = {
    primaryContainerNode: linkType,
  };

  render() {
    const { primaryContainerNode } = this.props;

    if (primaryContainerNode) {
      return (
        <Property label={NS.argu('primaryContainerNode')} />
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
