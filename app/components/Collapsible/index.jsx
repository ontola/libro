import React, { Component, PropTypes } from 'react';
import './Collapsible.scss';
import ReactCollapse from 'react-collapse';

const propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  visibleContent: PropTypes.node,
};

export default class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.showContent = this.showContent.bind(this);
    this.hideContent = this.hideContent.bind(this);
  }

  handleOnClick() {
    if (this.state.isVisible) {
      this.hideContent();
    } else {
      this.showContent();
    }
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

  className() {
    return this.state.isVisible
      ? 'Collapsible__hidden-part--visible'
      : 'Collapsible__hidden-part--hidden';
  }

  render() {
    const trigger = (
      <a
        href="javascript:void(0);"
        onClick={this.handleOnClick}
      >
        {this.props.trigger}
      </a>
    );

    return (
      <div className="Collapsible">
        {trigger}
        {this.props.visibleContent}
        <ReactCollapse isOpened={this.state.isVisible} >
          {this.props.children}
        </ReactCollapse>
      </div>
    );
  }

}

Collapsible.propTypes = propTypes;
