import './SideBar.scss';
import React, { PropTypes, Component } from 'react';
import Sidebar from 'react-sidebar';
import classNames from 'classnames';
import {
  Button,
} from 'components';

const propTypes = {
  /* The components that appear in the sidebar*/
  sidebar: PropTypes.node,
  /* The components that appear in the main area*/
  children: PropTypes.node,
  /* Set to true if you don't want the sidebar to appear from the left*/
  pullRight: PropTypes.bool,
  slim: PropTypes.bool,
  opened: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onDock: PropTypes.func.isRequired,
  onUndock: PropTypes.func.isRequired,
};

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.onSetSideBarOpen = this.onSetSideBarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentWillMount() {
    const mql = window.matchMedia(`(min-width: ${this.triggerWidth()})`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql,
    });
    if (mql.matches) {
      this.props.onDock();
    } else {
      this.props.onUndock();
    }

    this.styles = {
      sidebar: {
        // To overlap the BottomBar
        zIndex: '3',
      },
      content: {
        // Prevents items disappearing underneath Bottombar
        paddingBottom: '3em',
        // Makes overlay hide BottomBar
        zIndex: 0,
        // Enables inertial scrolling in iOS
        webkitOverflowScrolling: 'touch',
      },
    };
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  // Handles the events from the used Sidebar component, such as dragging
  // and closing by tapping the overlay.
  onSetSideBarOpen(open) {
    if (open) {
      this.props.onOpen();
    } else {
      this.props.onClose();
    }
  }

  triggerWidth() {
    if (this.props.slim === true) {
      return '900px';
    }
    return '1100px';
  }

  checkWidthAndDock() {
    if (this.state.mql.matches) {
      this.props.onDock();
    } else {
      this.props.onUndock();
    }
  }

  mediaQueryChanged() {
    this.checkWidthAndDock();
  }

  toggleOpen(ev) {
    if (ev) {
      ev.preventDefault();
    }
  }

  render() {
    const sideBarClassNames = classNames({
      'SideBar--sidebar': true,
      'SideBar--docked': this.props.docked,
      'SideBar--slim': this.props.slim,
    });

    return (
      <Sidebar
        docked={this.props.docked}
        onSetOpen={this.onSetSideBarOpen}
        open={this.props.opened}
        overlayClassName="SideBar--overlay"
        pullRight={this.props.pullRight}
        rootClassName="SideBar--content"
        sidebar={this.props.sidebar}
        sidebarClassName={sideBarClassNames}
        styles={this.styles}
      >
        {!this.props.docked && this.state.mql.matches &&
          <div className="SideBar--switch-wrapper">
            <Button
              onClick={() => this.props.onDock()}
              icon="caret-right"
              theme="as-box"
            >
            </Button>
          </div>
        }
        {this.props.docked &&
          <div className="SideBar--switch-wrapper">
            <Button
              onClick={() => this.props.onUndock()}
              icon="caret-left"
              theme="as-box"
            >
            </Button>
          </div>
        }
        {this.props.children}
      </Sidebar>
    );
  }
}

SideBar.propTypes = propTypes;

module.exports = SideBar;
