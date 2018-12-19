import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import FontAwesome from 'react-fontawesome';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

import CollapsibleContainer from '../../containers/CollapsibleContainer';
import { openInGrouped, closeOne } from '../../state/collapsible/actions';
import { getCollapsibleOpened } from '../../state/collapsible/selectors';
import Button from '../Button';

import './SideBarCollapsible.scss';

const messages = defineMessages({
  defaultMessage: {
    defaultMessage: 'Toggle submenu contents',
    id: 'https://app.argu.co/i18n/menus/defaultCollapseLabel',
  },
});

const propTypes = {
  alwaysMountChildren: PropTypes.bool,
  // A collection of SideBarLinks
  children: PropTypes.node,
  /**
   * Aria label for the collapsible caret elem
   * This should contain the menu's function as well as that it's a toggle
   */
  collapseLabel: PropTypes.string,
  id: PropTypes.string.isRequired,
  intl: intlShape,
  labelComp: PropTypes.node.isRequired,
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export class SideBarCollapsible extends PureComponent {
  render() {
    const {
      alwaysMountChildren,
      children,
      collapseLabel,
      id,
      intl: { formatMessage },
      labelComp,
      onClickToggle,
      open,
    } = this.props;

    const classes = classNames({
      SideBarCollapsible: true,
      'SideBarCollapsible--open': open,
    });

    return (
      <div className={classes} data-test="SideBarCollapsible-sideBarCollapsible">
        <div className="SideBarCollapsible__label" data-test="SideBarCollapsible-label">
          {labelComp}
          <Button
            plain
            ariaLabel={collapseLabel || formatMessage(messages.defaultMessage)}
            className="SideBarCollapsible__toggle"
            data-test="SideBarCollapsible-toggle"
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
  }
}

SideBarCollapsible.propTypes = propTypes;

export const withSideBarCollapsibleActions = connect(
  (state, ownProps) => ({
    open: getCollapsibleOpened(state, ownProps.id),
  }),
  (dispatch, { id }) => ({
    onClose: (e) => {
      if (e) {
        e.preventDefault();
      }
      dispatch(closeOne({
        identifier: id,
      }));
    },
    onOpen: (e) => {
      if (e) {
        e.preventDefault();
      }
      dispatch(openInGrouped({
        group: 'Navbar',
        identifier: id,
      }));
    },
  }),
  (stateProps, dispatchProps, ownProps) => Object.assign(
    {},
    ownProps,
    stateProps,
    {
      onClickToggle: stateProps.open ? dispatchProps.onClose : dispatchProps.onOpen,
    }
  )
);

export default withSideBarCollapsibleActions(injectIntl(SideBarCollapsible));
