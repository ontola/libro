import React, { Component, PropTypes } from 'react';
import './HoverBox.scss';

const propTypes = {
  /** Always visible. Functions as a trigger that responds to hover or focus. */
  children: PropTypes.node.isRequired,
  /** Only show when hovering over the trigger / children */
  hiddenChildren: PropTypes.node.isRequired,
};

const defaultProps = {
  children: '',
};

/**
 * Mouse-first component designed to add some extra info where requested. Since it uses 'hover'
 * state, make sure to add functionality for touch users.
 * @returns {component} Component
 */
export default class HoverBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

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

  // The trigger is always visisble and contains the children.
  // When the user hovers over them, the hiddenChildren appear.
  trigger(children) {
    return (
      <span
        onBlur={this.handleOnBlur}
        onFocus={this.handleOnFocus}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        tabIndex="0"
      >
        {children}
      </span>
    );
  }

  className() {
    return this.state.isVisible
      ? 'HoverBox__hidden-part--visible'
      : 'HoverBox__hidden-part--hidden';
  }

  render() {
    return (
      <div className="HoverBox">
        {this.trigger(this.props.children)}
        <div className={`HoverBox__hidden-part ${this.className()}`}>
          {this.props.children}
          {this.state.isVisible && this.props.hiddenChildren}
        </div>
      </div>
    );
  }
}

HoverBox.propTypes = propTypes;
HoverBox.defaultProps = defaultProps;
