/* eslint-disable */
import './Dropdown.scss';

import React, { PropTypes } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import { default as onClickOutside } from 'react-onclickoutside';

import HyperDropdownMixin from './HyperDropdownMixin';
import DropdownContent from './DropdownContent';

const Dropdown = React.createClass({
  mixins: [
    HyperDropdownMixin,
  ],

  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    dropdownClass: PropTypes.string,
    trigger: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  },

  render() {
    const { openState, renderLeft } = this.state;
    const { children } = this.props;

    const trigger = (
      <div
        className="Dropdown__trigger"
        onClick={this.handleClick}
        done={this.close}
        data-turbolinks="false"
        tabIndex="-1"
      >
        {this.props.trigger}
      </div>
    );

    const dropdownClass = `Dropdown ${(openState
      ? 'Dropdown-active'
      : '')} ${this.props.dropdownClass}`;

    const dropdownContent = (
      <DropdownContent
        renderLeft={renderLeft}
        close={this.close}
        {...this.props}
        key="required"
      >
        {children}
      </DropdownContent>
    );

    return (
      <div
        className={dropdownClass}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        tabIndex="1"
      >
        {trigger}
        <div
          className="reference-elem"
          style={{
            visibility: 'hidden',
            overflow: 'hidden',
            pointerEvents: 'none',
            position: 'absolute',
          }}
        >
          {dropdownContent}
        </div>
        <ReactTransitionGroup component="div" transitionName="dropdown" transitionAppear>
          {openState && dropdownContent}
        </ReactTransitionGroup>
      </div>
    );
  },
});

export default onClickOutside(Dropdown);
