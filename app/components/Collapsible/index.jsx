import React, { Component, PropTypes } from 'react';
import './Collapsible.scss';

const propTypes = {
  visibleContent: PropTypes.node,
  hidden: PropTypes.node.isRequired,
  trigger: PropTypes.node.isRequired,
};

const defaultProps = {
  children: '',
};

export default class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
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
        <div className={`Collapsible__hidden-part ${this.className()}`}>
          {this.state.isVisible && this.props.hidden}
        </div>
      </div>
    );
  }

}

Collapsible.propTypes = propTypes;
Collapsible.defaultProps = defaultProps;
