import './SideBar.scss';
import React, { PropTypes, Component } from 'react';
import Sidebar from 'react-sidebar';
import {
  Button,
} from 'components';

const propTypes = {
  sidebar: PropTypes.node,
  children: PropTypes.node,
};

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: false,
      sideBarDocked: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  componentWillMount() {
    const mql = window.matchMedia('(min-width: 1100px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql,
      sideBarDocked: mql.matches,
    });
    this.styles = {
      root: {
        top: '2.5rem',
      },
    };
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sideBarOpen: open });
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
    return (
      <Sidebar
        sidebar={this.props.sidebar}
        open={this.state.sideBarOpen}
        docked={this.state.sideBarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={this.styles}
        rootClassName="SideBar--content"
        sidebarClassName="SideBar--sidebar"
        overlayClassName="SideBar--overlay"
        pullRight
      >
        {!this.state.sideBarOpen && !this.state.sideBarDocked &&
          <div className="Sidebar--switch-wrapper">
            <Button
              onClick={() => this.setState({
                sideBarOpen: true,
              })}
              icon="comments"
              children="Discussie"
            />
          </div>
        }
        {this.props.children}
      </Sidebar>
    );
  }
}

SideBar.propTypes = propTypes;

module.exports = SideBar;
