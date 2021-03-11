import { withLRS } from 'link-redux';
import { LinkedRenderStoreContext } from 'link-redux/dist-types/types';
import React from 'react';

import DropdownMenu, { RenderProp } from '../../components/DropdownMenu';
import { isFunction } from '../../helpers/types';
import app from '../../ontology/app';
import Topology from '../Topology';

export const appMenuTopology = app.ns('topologies/appMenu');

export interface AppMenuProps {
  children: React.ReactNode | RenderProp;
  trigger: () => void;
}

class AppMenu extends Topology<
  AppMenuProps & LinkedRenderStoreContext,
  Record<string, unknown>,
  () => void
> {
  constructor(props: AppMenuProps & LinkedRenderStoreContext) {
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
        className="AppMenu"
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

export default withLRS(AppMenu);
