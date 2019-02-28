import {
  linkType,
  lrsType,
  register,
} from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import { NS } from '../../helpers/LinkedRenderStore';
import { menuStates } from '../../middleware/app';
import { navbarTopology } from '../../topologies/Navbar';

import './Menu.scss';

class Menu extends React.PureComponent {
  static type = NS.app('Menu');

  static topology = navbarTopology;

  static mapDataToProps = [NS.app('openState')];

  static propTypes = {
    lrs: lrsType,
    openState: linkType,
  };

  render() {
    const { lrs, openState } = this.props;

    let buttonSettings;
    switch (openState) {
      case menuStates.closing:
        buttonSettings = { action: 'actions/menu/close', icon: 'bars' };
        break;
      case menuStates.open:
        buttonSettings = { action: 'actions/menu/close', icon: 'close' };
        break;
      case menuStates.closed:
      default:
        buttonSettings = { action: 'actions/menu/open', icon: 'bars' };
        break;
    }

    return (
      <Button
        narrow
        plain
        className="Menu__button"
        icon={buttonSettings.icon}
        onClick={() => lrs.exec(NS.app(buttonSettings.action))}
      >
        menu
      </Button>
    );
  }
}

export default register(Menu);