import React, { PropTypes } from 'react';
import LinkedRenderStore, { getP, RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

import CollapsibleContainer from 'containers/CollapsibleContainer';
import {
  Button,
} from 'components';
import { initializeCollapsible, toggleOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';

import './properties/label';

const propTypes = {
  '@id': PropTypes.string,
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

const SubMenuSideBar = ({ '@id': id, onClickToggle, open }) => {
  const classes = classNames({
    SideBarCollapsible: true,
    'SideBarCollapsible--open': open,
  });

  return (
    <div className={classes}>
      <Property forSubMenu label="argu:href">
        <Property label="argu:label" />
      </Property>
      <Button
        plain
        alt={'Menu uitvouwen of inklappen'}
        className="SideBarCollapsible__toggle"
        onClick={onClickToggle}
      >
        <FontAwesome name="caret-right" />
      </Button>
      <CollapsibleContainer id={id}>
        <Property label="argu:menuItems" />
      </CollapsibleContainer>
    </div>
  );
};

SubMenuSideBar.propTypes = propTypes;

const SubMenuSideBarConnected = connect(
  (state, { data }) => ({
    '@id': getP(data, '@id'),
    open: getCollapsibleOpened(state, getP(data, '@id')),
    route: state.getIn(['router', 'locationBeforeTransitions', 'pathname']),
  }),
  (dispatch, { data }) => ({
    onClickToggle: () => dispatch(toggleOne(getP(data, '@id'))),
    onInitializeCollapsible: props => dispatch(initializeCollapsible(props)),
  }),
  null,
  { pure: false }
)(SubMenuSideBar);

LinkedRenderStore.registerRenderer(
  SubMenuSideBarConnected,
  'argu:SubMenu',
  RENDER_CLASS_NAME,
  'sidebar'
);
