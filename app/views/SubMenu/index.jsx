import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  subjectType,
  Property,
  withLinkCtx,
} from 'link-redux';
import React, { PureComponent } from 'react';

import { SideBarCollapsible } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { SideBarLinkIcon } from '../../components/SideBarLink/index';
import { sidebarTopology } from '../../topologies/Sidebar';

import Label from './properties/label';

const propTypes = {
  subject: subjectType,
};

class SubMenuSideBar extends PureComponent {
  render() {
    const { subject } = this.props;

    const label = (
      <Property forSubMenu label={NS.argu('href')}>
        <SideBarLinkIcon />
        <Property label={NS.schema('name')} />
      </Property>
    );

    return (
      <SideBarCollapsible
        id={`menu-${subject}`}
        labelComp={label}
      >
        <Property label={NS.argu('menuItems')} />
      </SideBarCollapsible>
    );
  }
}

SubMenuSideBar.propTypes = propTypes;

const SubMenuSideBarComplete = withLinkCtx(SubMenuSideBar);

export default [
  LinkedRenderStore.registerRenderer(
    SubMenuSideBarComplete,
    NS.argu('SubMenu'),
    RENDER_CLASS_NAME,
    sidebarTopology
  ),
  Label,
];
