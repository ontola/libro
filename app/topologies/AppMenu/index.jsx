import { withLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import DropdownMenu from '../../components/DropdownMenu';
import app from '../../ontology/app';
import Topology from '../Topology';

export const appMenuTopology = app.ns('topologies/appMenu');

class AppMenu extends Topology {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.func,
    ]),
    trigger: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.topology = appMenuTopology;
    this.renderContent = this.renderContent.bind(this);
  }

  render() {
    if (this.state.error) {
      return this.renderErrorComp();
    }

    return (
      <DropdownMenu
        disablePadding
        className="AppMenu"
        trigger={this.props.trigger}
      >
        {({ handleClose }) => this.renderContent(handleClose)}
      </DropdownMenu>
    );
  }

  renderContent(handleClose) {
    return this.wrap((subject) => {
      if (typeof this.props.children === 'function') {
        return this.props.children({
          handleClose,
          subject,
        });
      }

      return this.props.children;
    });
  }
}

export default withLRS(AppMenu);
