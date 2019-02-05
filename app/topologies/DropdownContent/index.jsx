/* eslint react/jsx-no-bind: 0 */
/* eslint react/no-find-dom-node: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

export const dropdownContentTopology = NS.argu('dropdownContent');

class DropdownContent extends Topology {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    close: PropTypes.func,
    contentClassName: PropTypes.string,
    renderLeft: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.topology = dropdownContentTopology;
  }

  getClassName() {
    const { contentClassName } = this.props;
    const collapseClass = this.props.renderLeft ? 'Dropdown--left ' : 'Dropdown-right ';

    return `Dropdown__content ${collapseClass}${contentClassName}`;
  }

  render() {
    if (this.state.error) {
      return this.renderError();
    }

    return (
      <OutsideClickHandler
        disabled={!this.props.enableOnClickOutside}
        onOutsideClick={this.props.close}
      >
        {this.renderContent()}
      </OutsideClickHandler>
    );
  }
}

export default DropdownContent;
