/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import { default as onClickOutside } from 'react-onclickoutside';

import DropdownContent from './DropdownContent';
import './Dropdown.scss';

const CLICK_AND_HOLD_TIMEOUT = 1000;

function isTouchDevice() {
  return (('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
  // navigator.msMaxTouchPoints for microsoft IE backwards compatibility
}

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  dropdownClass: PropTypes.string,
  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.listeningToClick = true;
    this.openedByClick = false;
    this.state = {
      dropdownElement: {},
      openState: false,
      renderLeft: false,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  calculateRenderLeft() {
    this.referenceDropdownElement().style.left = '0';
    this.referenceDropdownElement().style.right = 'auto';
    const elemRect = this.referenceDropdownElement().getBoundingClientRect();
    const shouldRenderLeft = (elemRect.width + elemRect.left) > window.innerWidth;
    this.setState({ renderLeft: shouldRenderLeft });
  }

  close() {
    this.listeningToClick = true;
    this.openedByClick = false;
    this.setState({ openState: false });
  }

  componentDidMount() {
    /* eslint-disable */
    this.setState({
      referenceDropdownElement: this.node.getElementsByClassName('Dropdown__content')[0],
      dropdownElement: this.node.getElementsByClassName('Dropdown__content')[1]
    });
    /* eslint-enable */
    window.addEventListener('resize', this.handleResize);
    this.calculateRenderLeft();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.clearTimeout(this.mouseEnterOpenedTimeout);
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.listeningToClick) {
      if (this.state.openState) {
        this.close();
      } else {
        this.open();
      }
    } else {
      this.openedByClick = true;
      this.listeningToClick = true;
    }
  }

  handleClickOutside() {
    if (this.state.openState === true) {
      this.close();
    }
  }

  handleResize() {
    this.calculateRenderLeft();
  }

  mouseEnterTimeoutCallback() {
    this.listeningToClick = true;
  }

  onMouseEnter() {
    if (!isTouchDevice() && !this.state.openState) {
      this.listeningToClick = false;
      // Start timer to prevent a quick close after clicking on the trigger
      this.mouseEnterOpenedTimeout = window.setTimeout(
        this.mouseEnterTimeoutCallback,
        CLICK_AND_HOLD_TIMEOUT
      );
      this.open();
    }
  }

  onMouseLeave() {
    if (!isTouchDevice() && this.state.openState) {
      if (!this.openedByClick) {
        this.close();
        // Remove / reset timer
        window.clearTimeout(this.mouseEnterOpenedTimeout);
      }
    }
  }

  open() {
    this.setState({ openState: true });
  }

  // Used to calculate the width of a dropdown content menu
  referenceDropdownElement() {
    let refDropdown;
    if (typeof this.state.referenceDropdownElement !== 'undefined') {
      refDropdown = this.state.referenceDropdownElement;
    } else {
      [refDropdown] = this.node.getElementsByClassName('Dropdown__content');
    }
    return refDropdown;
  }

  render() {
    const { openState, renderLeft } = this.state;
    const { children } = this.props;

    const trigger = (
      <div
        className="Dropdown__trigger"
        data-turbolinks="false"
        tabIndex="0"
        onClick={this.handleClick}
        onKeyUp={this.handleClick}
      >
        {this.props.trigger}
      </div>
    );

    const dropdownClass = `Dropdown ${(openState
      ? 'Dropdown-active'
      : '')} ${this.props.dropdownClass}`;

    const dropdownContent = (
      <DropdownContent
        close={this.close}
        renderLeft={renderLeft}
        {...this.props}
        key="required"
      >
        {children}
      </DropdownContent>
    );

    return (
      <div
        className={dropdownClass}
        ref={(node) => { this.node = node; }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {trigger}
        <div
          className="reference-elem"
          style={{
            overflow: 'hidden',
            pointerEvents: 'none',
            position: 'absolute',
            visibility: 'hidden',
          }}
        >
          {dropdownContent}
        </div>
        <ReactTransitionGroup transitionAppear component="div" transitionName="dropdown">
          {openState && dropdownContent}
        </ReactTransitionGroup>
      </div>
    );
  }
}

Dropdown.propTypes = propTypes;

export { default as DropdownLink } from './DropdownLink';
export default onClickOutside(Dropdown);
