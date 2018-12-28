import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { headerTopology } from '../../topologies/Header';

class OrganizationSidebar extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static topology = headerTopology;

  static mapDataToProps = [NS.argu('navigationsMenu')];

  static propTypes = {
    navigationsMenu: linkType,
  };

  render() {
    const { navigationsMenu } = this.props;

    return (
      <LinkedResourceContainer subject={navigationsMenu}>
        <Property label={NS.argu('menuItems')} />
      </LinkedResourceContainer>
    );
  }
}

export default register(OrganizationSidebar);
