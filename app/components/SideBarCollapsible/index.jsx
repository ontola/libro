import { connect } from 'react-redux';
import classNames from 'classnames';
import CollapsibleContainer from 'containers/CollapsibleContainer';
import React, { PropTypes } from 'react';
import './SideBarCollapsible.scss';

import { initializeCollapsible, toggleOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';
import {
  Button,
  SideBarLink,
} from 'components';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  // A collection of SideBarLinks
  children: PropTypes.node,
  // Unique string for state management
  id: PropTypes.string,
  label: PropTypes.string,
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
};

const SideBarCollapsible = ({
  id,
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
      <CollapsibleContainer
        id={id}
      >
        {children}
      </CollapsibleContainer>
      <Button
        plain
        onClick={() => onClickToggle()}
        className="SideBarCollapsible__toggle"
      >
        <FontAwesome name="caret-right" />
      </Button>
    </div>
  );
};

SideBarCollapsible.propTypes = propTypes;

// export default SideBarCollapsible;

export default connect(
  (state, ownProps) => ({
    open: getCollapsibleOpened(state, ownProps),
  }),
  (dispatch, { id }) => ({
    onClickToggle: () => dispatch(toggleOne({ id })),
    onInitializeCollapsible: data => dispatch(initializeCollapsible(data)),
  })
)(SideBarCollapsible);
