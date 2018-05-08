import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  closeSideBar,
  dockSideBar,
  initializeSideBar,
  openSideBar,
  undockSideBar,
} from 'state/sideBars/actions';
import {
  getSideBarColor,
  getSideBarDocked,
  getSideBarOpened,
} from 'state/sideBars/selectors';

import { SideBar } from '../components';

const propTypes = {
  id: PropTypes.string.isRequired,
  onDock: PropTypes.func.isRequired,
  onInitializeSideBar: PropTypes.func.isRequired,
  onUndock: PropTypes.func.isRequired,
  slim: PropTypes.bool,
};

const defaultProps = {
  slim: false,
};

class SideBarContainer extends Component {
  constructor(props) {
    super(props);

    this.triggerWidth = () => {
      if (this.props.slim === true) {
        return '900px';
      }
      return '1100px';
    };

    this.mql = window.matchMedia(`(min-width: ${this.triggerWidth()})`);

    this.state = {
      isWideWindow: this.mql.matches,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentDidMount() {
    this.props.onInitializeSideBar({
      docked: this.mql.matches,
      id: this.props.id,
    });

    if (typeof window !== 'undefined') {
      this.mql.addListener(this.mediaQueryChanged);

      if (this.mql.matches) {
        this.props.onDock();
      } else {
        this.props.onUndock();
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      this.mql.removeListener(this.mediaQueryChanged);
    }
  }

  mediaQueryChanged() {
    this.setState({
      isWideWindow: this.mql.matches,
    });

    if (this.state.isWideWindow) {
      this.props.onDock();
    } else {
      this.props.onUndock();
    }
  }

  render() {
    return <SideBar isWideWindow={this.state.isWideWindow} {...this.props} />;
  }
}

SideBarContainer.propTypes = propTypes;
SideBarContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    docked: getSideBarDocked(state, ownProps),
    opened: getSideBarOpened(state, ownProps),
    orgColor: getSideBarColor(state),
  }),
  (dispatch, { id }) => ({
    onClose: () => dispatch(closeSideBar(id)),
    onDock: () => dispatch(dockSideBar(id)),
    onInitializeSideBar: () => dispatch(initializeSideBar({ id })),
    onOpen: () => dispatch(openSideBar(id)),
    onUndock: () => dispatch(undockSideBar(id)),
  })
)(SideBarContainer);
