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
  opened: PropTypes.bool,
  docked: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onDock: PropTypes.func.isRequired,
  onUndock: PropTypes.func.isRequired,
};

const defaultProps = {
  docked: false,
  opened: false,
};

class SideBar extends Component {
  static toggleOpen(ev) {
    if (ev) {
      ev.preventDefault();
    }
  }

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
        overflowY: 'visible',
      },
      content: {
        // Prevents items disappearing underneath Bottombar. Equal to $bottom-padding-height
        paddingBottom: '3em',
        // Makes overlay hide BottomBar
        zIndex: 0,
        // Enables inertial scrolling in iOS
        WebkitOverflowScrolling: 'touch',
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

  render() {
    const sideBarClassNames = classNames({
      'SideBar--sidebar': true,
      'SideBar--docked': this.props.docked,
      'SideBar--slim': this.props.slim,
    });
    const buttonClassNames = classNames({
      'SideBar--switch-wrapper': true,
      'SideBar--switch-wrapper--right': this.props.pullRight,
    });

    const dockIcon = () => {
      if (this.props.pullRight === true) {
        return 'caret-left';
      }
      return 'caret-right';
    };

    const undockIcon = () => {
      if (this.props.pullRight === true) {
        return 'caret-right';
      }
      return 'caret-left';
    };

    const sidebar = (
      <div className="SideBar--sidebar--wrapper">
        {this.props.sidebar}
        {!this.props.docked && this.state.mql.matches &&
          <div className={buttonClassNames}>
            <Button
              onClick={() => this.props.onDock()}
              icon={dockIcon()}
              theme="as-box"
              narrow
            />
          </div>
        }
        {this.props.docked &&
          <div className={buttonClassNames}>
            <Button
              onClick={() => this.props.onUndock()}
              icon={undockIcon()}
              theme="as-box"
              narrow
            />
          </div>
        }
      </div>
    );

    return (
      <Sidebar
        docked={this.props.docked}
        onSetOpen={this.onSetSideBarOpen}
        open={this.props.opened}
        overlayClassName="SideBar--overlay"
        pullRight={this.props.pullRight}
        rootClassName="SideBar--content"
        sidebar={sidebar}
        sidebarClassName={sideBarClassNames}
        styles={this.styles}
      >
        {this.props.children}
      </Sidebar>
    );
  }
}

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

module.exports = SideBar;
