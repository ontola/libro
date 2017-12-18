import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import CollapsibleContainer from 'containers/CollapsibleContainer';
import { openInGrouped, closeOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';

import Button from '../Button';

import './SideBarCollapsible.scss';

const propTypes = {
  alwaysMountChildren: PropTypes.bool,
  // A collection of SideBarLinks
  children: PropTypes.node,
  id: PropTypes.string,
  labelComp: PropTypes.node.isRequired,
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

const SideBarCollapsible = ({
  alwaysMountChildren,
  children,
  id,
  labelComp,
  onClickToggle,
  open,
}) => {
  const classes = classNames({
    SideBarCollapsible: true,
    'SideBarCollapsible--open': open,
  });

  return (
    <div className={classes}>
      <div className="SideBarCollapsible__label">
        {labelComp}
        <Button
          plain
          alt="Menu uitvouwen of inklappen"
          className="SideBarCollapsible__toggle"
          onClick={onClickToggle}
        >
          <FontAwesome name="caret-right" />
        </Button>
      </div>
      <CollapsibleContainer
        alwaysMountChildren={alwaysMountChildren}
        group="Navbar"
        id={id}
      >
        {children}
      </CollapsibleContainer>
    </div>
  );
};

SideBarCollapsible.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    open: getCollapsibleOpened(state, ownProps.id),
  }),
  (dispatch, { id }) => ({
    onClose: () => dispatch(closeOne({
      identifier: id,
    })),
    onOpen: () => dispatch(openInGrouped({
      group: 'Navbar',
      identifier: id,
    })),
  }),
  (stateProps, dispatchProps, ownProps) => Object.assign(
    {},
    ownProps,
    stateProps,
    {
      onClickToggle: stateProps.open ? dispatchProps.onClose : dispatchProps.onOpen,
    }
  )
)(SideBarCollapsible);
