// @flow
import React, { Component, PropTypes } from 'react';
import './HoverBox.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  currentClass: PropTypes.string,
  hiddenChildren: PropTypes.node.isRequired,
};

const defaultProps = {
  children: '',
};

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
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
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
