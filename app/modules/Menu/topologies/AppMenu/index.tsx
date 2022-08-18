import { SomeNode } from 'link-lib';
import { createTopologyProvider, useLinkRenderContext } from 'link-redux';
import React from 'react';

import { isFunction } from '../../../Kernel/lib/typeCheckers';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import { Trigger } from '../../components/DropdownMenu/TriggerButton';
import { appMenuTopology } from '../index';

export const appMenuCID = 'CID-AppMenu';

export interface AppMenuProps {
  children: React.ReactNode | ((props: AppMenuChildProps) => React.ReactNode);
  title?: string;
  trigger: Trigger;
}

export interface AppMenuChildProps {
  handleClose: () => void;
  subject: SomeNode;
}

const AppMenuTopology = createTopologyProvider(appMenuTopology);

const AppMenu: React.FC<AppMenuProps> = ({ children, title, trigger }) => {
  const { subject } = useLinkRenderContext();

  return (
    <DropdownMenu
      disablePadding
      className={appMenuCID}
      title={title ?? 'App Menu'}
      trigger={trigger}
    >
      {({ handleClose }) => (
        <AppMenuTopology>
          {isFunction(children)
            ? children({
              handleClose,
              subject,
            })
            : children}
        </AppMenuTopology>
      )}
    </DropdownMenu>
  );
};

export default AppMenu;
