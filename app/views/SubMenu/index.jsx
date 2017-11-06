import classNames from 'classnames';
import { RENDER_CLASS_NAME } from 'link-lib';
import { lowLevel, Property, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import CollapsibleContainer from 'containers/CollapsibleContainer';
import { initializeCollapsible, toggleOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';

import {
  Button,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/label';

const propTypes = {
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  subject: subjectType,
};

const SubMenuSideBar = ({
  subject,
  onClickToggle,
  open
}) => {
  const classes = classNames({
    SideBarCollapsible: true,
    'SideBarCollapsible--open': open,
  });

  return (
    <div className={classes}>
      <Property forSubMenu label={NS.argu('href')}>
        <Property label={NS.argu('label')} />
      </Property>
      <Button
        plain
        alt="Menu uitvouwen of inklappen"
        className="SideBarCollapsible__toggle"
        onClick={onClickToggle}
      >
        <FontAwesome name="caret-right" />
      </Button>
      <CollapsibleContainer id={subject}>
        <Property label={NS.argu('menuItems')} />
      </CollapsibleContainer>
    </div>
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

LinkedRenderStore.registerRenderer(
  SubMenuSideBarComplete,
  NS.argu('SubMenu'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
