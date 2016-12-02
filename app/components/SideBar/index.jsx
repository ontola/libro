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
  /* Unique ID for state management */
  ID: PropTypes.string.isRequired,
};

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: false,
      sideBarDocked: true,
    };
    this.onSetSideBarOpen = this.onSetSideBarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  componentWillMount() {
    const mql = window.matchMedia(`(min-width: ${this.triggerWidth()})`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql,
      sideBarDocked: mql.matches,
    });
    this.styles = {
      sidebar: {
        // To overlap the BottomBar
        zIndex: '3',
      },
      content: {
        // Prevents items disappearing underneath Bottombar
        paddingBottom: '3em',
      },
    };
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSideBarOpen(open) {
    this.setState({ sideBarOpen: open });
  }

  triggerWidth() {
    if (this.props.slim === true) {
      return '900px';
    }
    return '1100px';
  }

  mediaQueryChanged() {
    this.setState({ sideBarDocked: this.state.mql.matches });
  }

  toggleOpen(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  }


  render() {
    const {
      sideBarOpen,
      sideBarDocked,
    } = this.state;

    const sideBarClassNames = classNames({
      'SideBar--sidebar': true,
      'SideBar--docked': sideBarDocked,
      'SideBar--slim': this.props.slim,
    });

    return (
      <Sidebar
        docked={sideBarDocked}
        onSetOpen={this.onSetSideBarOpen}
        open={sideBarOpen}
        overlayClassName="SideBar--overlay"
        pullRight={this.props.pullRight}
        rootClassName="SideBar--content"
        sidebar={this.props.sidebar}
        sidebarClassName={sideBarClassNames}
        styles={this.styles}
      >
        {!sideBarOpen && !sideBarDocked &&
          <div className="SideBar--switch-wrapper">
            <Button
              onClick={() => this.setState({
                sideBarOpen: true,
              })}
              icon="comments"
              theme="as-box"
            >
              Timeline
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
