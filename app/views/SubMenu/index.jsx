import React, { PropTypes } from 'react';
import { getP, RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

import CollapsibleContainer from 'containers/CollapsibleContainer';
import { initializeCollapsible, toggleOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';

import {
  Button,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/label';

const propTypes = {
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#subject': PropTypes.string,
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

const SubMenuSideBar = ({
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#subject': id,
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
        alt={'Menu uitvouwen of inklappen'}
        className="SideBarCollapsible__toggle"
        onClick={onClickToggle}
      >
        <FontAwesome name="caret-right" />
      </Button>
      <CollapsibleContainer id={id}>
        <Property label={NS.argu('menuItems')} />
      </CollapsibleContainer>
    </div>
  );
};

SubMenuSideBar.propTypes = propTypes;

const SubMenuSideBarConnected = connect(
  (state, { data }) => ({
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#subject': getP(data, '@id'),
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
  NS.argu('SubMenu'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
