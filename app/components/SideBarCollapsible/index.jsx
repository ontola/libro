import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import CollapsibleContainer from 'containers/CollapsibleContainer';
import { initializeCollapsible, toggleOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';

import Button from '../Button';
import SideBarLink from '../SideBarLink';

import './SideBarCollapsible.scss';

const propTypes = {
  // A collection of SideBarLinks
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const SideBarCollapsible = ({
  label,
  children,
  onClickToggle,
  to,
  open,
}) => {
  const classes = classNames({
    SideBarCollapsible: true,
    'SideBarCollapsible--open': open,
  });

  return (
    <div className={classes}>
      <SideBarLink
        label={label}
        to={to}
        bold
        isIndex
      />
      <Button
        plain
        onClick={() => onClickToggle()}
        className="SideBarCollapsible__toggle"
        alt={'Menu uitvouwen of inklappen'}
      >
        <FontAwesome name="caret-right" />
      </Button>
      <CollapsibleContainer
        id={label}
      >
        {children}
      </CollapsibleContainer>
    </div>
  );
};

SideBarCollapsible.propTypes = propTypes;

export default connect(
  (state, ownProps) => ({
    open: getCollapsibleOpened(state, ownProps.label),
  }),
  (dispatch, { label }) => ({
    onClickToggle: () => dispatch(toggleOne(label)),
    onInitializeCollapsible: data => dispatch(initializeCollapsible(data)),
  })
)(SideBarCollapsible);
