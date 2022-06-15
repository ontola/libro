import React from 'react';

import { isFunction } from '../../modules/Common/lib/typeCheckers';
import DropdownMenu, { RenderProp } from '../../modules/Menu/components/DropdownMenu/DropdownMenu';
import { Trigger } from '../../modules/Menu/components/DropdownMenu/TriggerButton';
import { appMenuTopology } from '../../topologies';
import Topology from '../Topology';

export const appMenuCID = 'CID-AppMenu';

export interface AppMenuProps {
  children: React.ReactNode | RenderProp;
  title?: string;
  trigger: Trigger;
}

class AppMenu extends Topology<
  AppMenuProps,
  Record<string, unknown>,
  () => void
> {
  constructor(props: AppMenuProps) {
    super(props);

    this.topology = appMenuTopology;
    this.renderContent = this.renderContent.bind(this);
  }

  render() {
    if (this.state.error) {
      return this.renderErrorComp();
    }

    return (
      <DropdownMenu
        disablePadding
        className={appMenuCID}
        title={this.props.title ?? 'App Menu'}
        trigger={this.props.trigger}
      >
        {({ handleClose }) => this.renderContent(handleClose)}
      </DropdownMenu>
    );
  }

  renderContent(handleClose: () => void): JSX.Element {
    return this.wrap((subject) => {
      if (isFunction(this.props.children)) {
        return this.props.children({
          handleClose,
          subject,
        }) as React.ReactNode;
      }

      return this.props.children as JSX.Element;
    });
  }
}

export default AppMenu;
