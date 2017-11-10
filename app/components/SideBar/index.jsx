import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { ScrollContainer } from 'react-router-scroll';

import Button from '../Button';

import './SideBar.scss';

const propTypes = {
  /* The components that appear in the main area */
  children: PropTypes.node,
  docked: PropTypes.bool,
  id: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onDock: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onUndock: PropTypes.func.isRequired,
  opened: PropTypes.bool,
  /* Set to true if you don't want the sidebar to appear from the left */
  pullRight: PropTypes.bool,
  /* The components that appear in the sidebar */
  sidebar: PropTypes.node,
  slim: PropTypes.bool,
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
    if (typeof window !== 'undefined') {
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
    }

    this.styles = {
      content: {
        // Enables inertial scrolling in iOS
        WebkitOverflowScrolling: 'touch',
        // We scroll in a ScrollContainer wrapper, so 'content' should not scroll.
        overflow: 'hidden',
      },
      sidebar: {
        overflowY: 'visible',
        // To overlap the BottomBar
        zIndex: '3',
      },
    };
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      this.state.mql.removeListener(this.mediaQueryChanged);
    }
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
      SideBar__sidebar: true,
      'SideBar--docked': this.props.docked,
      'SideBar--slim': this.props.slim,
    });
    const buttonClassNames = classNames({
      'SideBar__switch-wrapper': true,
      'SideBar__switch-wrapper--right': this.props.pullRight,
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
      <div className="SideBar__sidebar-wrapper">
        {this.props.sidebar}
        {!this.props.docked && (typeof window === 'undefined' || this.state.mql.matches) &&
          <div className={buttonClassNames}>
            <Button
              narrow
              icon={dockIcon()}
              theme="as-card"
              onClick={() => this.props.onDock()}
            />
          </div>
        }
        {this.props.docked &&
          <div className={buttonClassNames}>
            <Button
              narrow
              icon={undockIcon()}
              theme="as-card"
              onClick={() => this.props.onUndock()}
            />
          </div>
        }
      </div>
    );

    return (
      <Sidebar
        docked={this.props.docked}
        open={this.props.opened}
        overlayClassName="SideBar--overlay"
        pullRight={this.props.pullRight}
        sidebar={sidebar}
        sidebarClassName={sideBarClassNames}
        styles={this.styles}
        onSetOpen={this.onSetSideBarOpen}
      >
        <ScrollContainer
          scrollKey={this.props.id}
        >
          <div className="SideBar__content">
            {this.props.children}
          </div>
        </ScrollContainer>
      </Sidebar>
    );
  }
}

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

export default SideBar;
