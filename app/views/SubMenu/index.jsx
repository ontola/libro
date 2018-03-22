import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  subjectType,
  lowLevel,
  Property,
} from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';

import { initializeCollapsible, toggleOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';

import { SideBarCollapsible } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { SideBarLinkIcon } from '../../components/SideBarLink/index';

import Label from './properties/label';

const propTypes = {
  subject: subjectType,
};

const SubMenuSideBar = ({ subject }) => {
  const label = (
    <Property forSubMenu label={NS.argu('href')}>
      <SideBarLinkIcon />
      <Property label={NS.argu('label')} />
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
};

SubMenuSideBar.propTypes = propTypes;

const SubMenuSideBarConnected = connect(
  (state, { subject }) => ({
    open: getCollapsibleOpened(state, subject),
    route: state.getIn(['router', 'locationBeforeTransitions', 'pathname']),
  }),
  (dispatch, { subject }) => ({
    onClickToggle: () => dispatch(toggleOne(subject)),
    onInitializeCollapsible: props => dispatch(initializeCollapsible(props)),
  }),
  null,
  { pure: false }
)(SubMenuSideBar);

const SubMenuSideBarComplete = lowLevel.linkedSubject(SubMenuSideBarConnected);

export default [
  LinkedRenderStore.registerRenderer(
    SubMenuSideBarComplete,
    NS.argu('SubMenu'),
    RENDER_CLASS_NAME,
    NS.argu('sidebar')
  ),
  Label
];
