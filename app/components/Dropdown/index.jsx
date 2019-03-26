/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { animated, Transition } from 'react-spring';

import DropdownContent from '../../topologies/DropdownContent/index';
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
    PropTypes.func,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  contentClassName: PropTypes.string,
  /** Mount on open, requires children to be a render prop */
  lazy: PropTypes.bool,
  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.listeningToClick = true;
    this.openedByClick = false;
    this.referenceElem = React.createRef();
    this.state = {
      calculated: false,
      openState: false,
      renderLeft: false,
    };
    this.calculateRenderLeft = this.calculateRenderLeft.bind(this);
    this.close = this.close.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  calculateRenderLeft(force = false) {
    if (!this.state.calculated && !force) {
      return undefined;
    }

    const elem = this.referenceElem.current;
    elem.style.left = '0';
    elem.style.right = 'auto';
    const elemRect = elem.getBoundingClientRect();
    const shouldRenderLeft = (elemRect.width + elemRect.left) > window.innerWidth;
    this.setState({
      calculated: true,
      openState: true,
      renderLeft: shouldRenderLeft,
    });
  }

  close() {
    this.listeningToClick = true;
    this.openedByClick = false;
    this.setState({ openState: false });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
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

  handleResize() {
    if (this.state.openState) {
      this.calculateRenderLeft(true);
    }
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
    this.calculateRenderLeft(true);
    this.setState({ openState: true });
  }

  render() {
    const { openState, renderLeft } = this.state;
    const { children, lazy } = this.props;

    const trigger = (
      <div
        className="Dropdown__trigger"
        tabIndex="0"
        onClick={this.handleClick}
        onKeyUp={this.handleClick}
      >
        {this.props.trigger}
      </div>
    );

    let renderItem = children;
    if (lazy) {
      renderItem = openState ? children() : null;
    }

    return (
      <div
        className={`Dropdown ${(openState ? 'Dropdown-active' : '')}`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {trigger}
        <div
          style={{
            overflow: 'hidden',
            pointerEvents: 'none',
            position: 'absolute',
            visibility: 'hidden',
          }}
        >
          <DropdownContent
            contentClassName={this.props.contentClassName}
            close={this.close}
            disableOnClickOutside={true}
          >
            <div ref={this.referenceElem}>
              {renderItem}
            </div>
          </DropdownContent>
        </div>
        <Transition
          native
          enter={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
          from={{
            opacity: 0,
            position: "relative",
            transform: 'translate3d(0, 1em, 0)',
            willChange: "opacity, transform, pointer-events",
          }}
          items={openState && renderItem}
          leave={{ opacity: 0, pointerEvents: 'none', transform: 'translate3d(0, 1em, 0)' }}
        >
          {item => style => (
            <animated.div style={style}>
              <DropdownContent
                close={this.close}
                contentClassName={this.props.contentClassName}
                enableOnClickOutside={openState}
                key="required"
                renderLeft={renderLeft}
              >
                {item}
              </DropdownContent>
            </animated.div>
          )}
        </Transition>
      </div>
    );
  }
}

Dropdown.propTypes = propTypes;

export { default as DropdownLink } from './DropdownLink';
export default Dropdown;
