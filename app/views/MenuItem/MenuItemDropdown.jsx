import {
  linkType,
  LinkedResourceContainer,
  Property,
  register,
  unstable,
} from 'link-redux';
import React from 'react';

import {
  Dropdown,
  Resource,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
import { handle } from '../../helpers/logging';
import { renderError } from '../../topologies/Topology';

class MenuItemDropdown extends React.Component {
  static contextType = unstable.LinkRenderCtx;

  static type = [
    NS.argu('MenuItem'),
    NS.argu('MenuSection'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = cardFloatTopology;

  static mapDataToProps = [NS.argu('menuItems')];

  static propTypes = {
    menuItems: linkType,
  };

  constructor(props) {
    super(props);

    this.renderError = renderError(this);
    this.state = {
      error: undefined,
    };
  }

  componentDidCatch(error, ignored) {
    handle(error);
    this.setState({ error });
  }

  render() {
    const { menuItems } = this.props;

    if (this.state.error) {
      return this.renderError();
    }

    return (
      <Resource>
        <Dropdown
          lazy
          trigger={<Property label={NS.schema('name')} />}
        >
          {() => <LinkedResourceContainer subject={menuItems} topology={dropdownContentTopology} />}
        </Dropdown>
      </Resource>
    );
  }
}

export default register(MenuItemDropdown);
