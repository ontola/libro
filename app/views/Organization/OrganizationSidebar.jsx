import {
  LinkedResourceContainer,
  Property,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

class OrganizationSidebar extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static topology = NS.argu('sidebar');

  static mapDataToProps = [NS.argu('navigationsMenu')];

  static propTypes = {
    navigationsMenu: linkedPropType,
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
