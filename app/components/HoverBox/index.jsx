import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import './HoverBox.scss';

import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  /** Always visible. Functions as a trigger that responds to hover or focus. */
  children: PropTypes.node.isRequired,
  /** Only show when hovering over the trigger / children */
  hiddenChildren: PropTypes.node.isRequired,
};

export default function (topology = NS.argu('cardHover'), popout = false) {
  /**
   * Mouse-first component designed to add some extra info where requested. Since it uses 'hover'
   * state, make sure to add functionality for touch users.
   * @returns {component} Component
   */
  class HoverBox extends TopologyProvider {
    constructor() {
      super();

      this.state = {
        isVisible: false,
      };
      this.topology = topology;

      this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
      this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
      this.handleOnFocus = this.handleOnFocus.bind(this);
      this.handleOnBlur = this.handleOnBlur.bind(this);
      this.showContent = this.showContent.bind(this);
      this.hideContent = this.hideContent.bind(this);
    }

    handleOnMouseEnter() {
      this.showContent();
    }

    handleOnMouseLeave() {
      this.hideContent();
    }

    handleOnFocus() {
      this.showContent();
    }

    handleOnBlur() {
      this.hideContent();
    }

    showContent() {
      this.setState({
        isVisible: true,
      });
    }

    hideContent() {
      this.setState({
        isVisible: false,
      });
    }

    // The trigger is always visible and contains the children.
    // When the user hovers over them, the hiddenChildren appear.
    trigger(children) {
      return (
        <span
          data-test="HoverBox-trigger"
          tabIndex="0"
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
          onMouseEnter={this.handleOnMouseEnter}
          onMouseLeave={this.handleOnMouseLeave}
        >
          {children}
        </span>
      );
    }

    classNames() {
      return this.state.isVisible
        ? `HoverBox__hidden-part--visible ${popout && 'HoverBox__hidden-part--visible--popout'}`
        : 'HoverBox__hidden-part--hidden';
    }

    render() {
      return (
        <div className={`HoverBox ${this.props.shine && 'HoverBox--shine'}`} data-test="HoverBox">
          {this.trigger(this.props.children)}
          <div className={`HoverBox__hidden-part ${this.classNames()}`}>
            {!popout && this.props.children}
            {this.state.isVisible && this.props.hiddenChildren}
          </div>
        </div>
      );
    }
  }

  HoverBox.propTypes = propTypes;

  return HoverBox;
}
